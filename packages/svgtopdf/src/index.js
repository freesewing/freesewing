import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import formidable from "formidable";
import shellExec from "shell-exec";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Show form for on-demand tiling
app.get("/", async (req, res) => res.sendFile(path.resolve(__dirname+'/form.html')));

// Handle POST for on-demand tiling
app.post("/", async (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const formats = ['pdf','ps'];
    const sizes = ['full', 'a4','a3','a2','a1','a0','letter','tabloid'];
    if(
      err ||
      typeof files.svg === "undefined" ||
      formats.indexOf(fields.format) === -1 ||
      sizes.indexOf(fields.size) === -1
      ) return res.sendFile(path.resolve(__dirname+'/form.html'));
    let upload = files.svg.path;
    let cmd;
    if(fields.size === "full") { // Do not tile
      let target = `/tmp/pattern.${fields.format}`;
      cmd = `/usr/bin/inkscape --export-${fields.format}=${target} ${upload}`;
      shellExec(cmd).then(() => {
        return res.sendFile(target);
      });
    } else { // Do tile
      let untiled = "/tmp/untiled.ps";
      let tiled = "/tmp/tiled.ps";
      cmd = `/usr/bin/inkscape --export-ps=${untiled} ${upload}`;
      shellExec(cmd).then(() => {
        cmd = `/usr/local/bin/tile -a -m${fields.size} -s1 -t"On-demand tiler" ${untiled} > ${tiled}`;
        shellExec(cmd).then(() => {
          if(fields.format === "ps") return res.sendFile(tiled);
          cmd = `/usr/bin/ps2pdf14 ${tiled} ${tiled}.pdf`;
          shellExec(cmd).then(() => {
            return res.sendFile(tiled+'.pdf');
          });
        });
      });
    }
  });
});

// TODO: Provide API endpoint
app.post("/api", async (req, res) => {
});

app.listen(port, err => {
  if (err) console.error('Error occured', err);
  console.log(`> listening on port ${port}`);
});
