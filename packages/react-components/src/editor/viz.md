digraph G {
  graph [fontname = "Handlee"];
  node [fontname = "Handlee", shape="component"];
  edge [fontname = "Handlee"];

  bgcolor=transparent;

  PatternEditor -> ViewWrapper
  
  ViewWrapper -> DraftView
  ViewWrapper -> DesignsView
  ViewWrapper -> MeasurementsView
  ViewWrapper -> ViewPicker
  
  DraftView -> PatternLayout [label="DraftMenu"]
  PatternLayout -> ZoomContextProvider
  pattern [shape="note", label="Pattern\n(pattern renderprop)"]
  DraftMenu [shape="note", label="DraftMenu\n(menu renderprop)"]
  Header [shape="component", label="Header\n(Header renderprop)"]
  title [shape="plain", label="title\n(title prop)"]
  
  ZoomContextProvider -> pattern
  ZoomContextProvider -> DraftMenu
  ZoomContextProvider -> Header
  ZoomContextProvider -> title
  
  DraftMenu -> Accordion
  Accordion -> DesignOptionsMenu -> MenuItemGroup 
  MenuItemGroup -> DesignOption
  MenuItemGroup -> DesignOption
  MenuItemGroup -> DesignOption

  DesignOption -> MenuItem -> FormControl -> Input
  MenuItem -> MenuItemTitle
  Input -> MenuBoolInput
  Input -> MenuConstantInput
  Input -> MenuSliderInput
  Input -> MenuDegInput
  Input -> MenuListInput
  Input -> MenuPctInput
  
  
  
  subgraph cluster_0 {
    style=filled;
    color=lightgrey;
    label="PatternLayout"
    node [fontname = "Handlee", shape="component"];
    tst
    fontsize = 20;
  }
}

