export default `
  /* Paperless grid */
  svg.freesewing path.grid {
    fill: none;
    stroke: #555;
    stroke-width: 0.3;
  }
  svg.freesewing path.gridline {
    stroke: #555;
    stroke-width: 0.2;
  }
  svg.freesewing path.gridline-lg {
    stroke: #777;
    stroke-width: 0.2;
    stroke-dasharray: 1.5,1.5;
  }
  svg.freesewing path.gridline-sm {
    stroke: #999;
    stroke-width: 0.1;
  }
  svg.freesewing path.gridline-xs {
    stroke: #999;
    stroke-width: 0.1;
    stroke-dasharray: 0.5,0.5;
  }
  svg.freesewing path.gridbox {
    fill: url(#grid);
  }
`;
