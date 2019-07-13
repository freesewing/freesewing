import axios from "axios";

function useTiler(baseURL = "https://tiler.freesewing.org", timeout = 10000) {
  const api = axios.create({ baseURL, timeout });
  const tiler = {
    tile: (svg, format = "pdf", size = "a4") =>
      api.post("/api", { svg, format, size })
  };

  return tiler;
}

export default useTiler;
