## About

This plugin adds the ability to export patterns to DXF-ASTM.

DXF (Drawing interchange format) is a file format developed by Autodesk
(of AutoCAD® fame).  
The DXF-ASTM variety is a subset of the format, specifically targetted
at the garment industry.

ASTM is the _American Society for Testing and Materials_ — a standards body —
that published the format.
DXF-ASTM is the successor of DXF-AAMA which was developed by the _American
Apparel Manufacturers Association_ which reveals the origins of the file format.

## Usage

Instantiate your pattern, and use the plugin.
It will add the `exportDxf()` method to the pattern object.
This method will return the DXF-ASTM output.

```js
import models from '@freesewing/models'
import Aaron from '@freesewing/aaron'
import exportDxfPlugin from '@freesewing/plugin-export-dxf'

const settings = {
  // Make sure to set complete to false
  complete: false,
  measurements: models.withoutBreasts.size42
}

let dxf = new Aaron(settings).use(exportDxfPlugin).draft().exportDxf()
```

## Configuration

This plugin takes a configuration object as a second parameter to the
`pattern.use()` method.

### Precision

The precision property determines the length of the line segments used
to approximate curves. The generated DXF-ASTM output will only contain
straight lines, so curves will be approximated wiht lines segments.

The `precision` sets the length of those segments in mm.
In the example below, the `precision` is set to `25` resulting in
the use of line segments 25mm (1 inch) to approximate the curve.

```js
let config = {
  precision: 25
}

let dxf = new Aaron(settings).use(exportDxfPlugin, config)
```

The default `precision` is `1`, giving you 1mm long line segments
to approximate curves.

## Reasons to use this plugin

This plugin can export your pattern to DXF-ASTM so you can import it to
your 3D software of choice.

## Reasons to not use this plugin

### Because DXF is inferior to SVG in every way

DXF (and DXF-AAMA and DXF-ASTM with it) are rooted in the world of industrial
manufacturing. And it shows.

Nowadays, it's easy to think of the DXF file format as a bit of an embarassment.  
But it is deliberatly kept dumb so that old industrial CNC milling machines,
plotters, laster cutters and whatnot, can handle the format.

### Because this plugin does not implement all of DXF

This plugin does the minimum to allow export of FreeSewing patterns into
3D garment tools. It expexts the input pattern to only include the outlines.

That means, no seam allowance, or titles, no notches, and so on.
