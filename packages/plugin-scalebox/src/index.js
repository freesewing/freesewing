import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.attributes.add("freesewing:plugin-scalebox", version);
      next();
    }
  },
  macros: {
    scalebox: function(so) {
      // Boxes
      this.points.__scaleboxMetricTopLeft = new this.Point(
        so.at.x - 50,
        so.at.y - 25
      );
      this.points.__scaleboxMetricTopRight = new this.Point(
        so.at.x + 50,
        so.at.y - 25
      );
      this.points.__scaleboxMetricBottomLeft = new this.Point(
        so.at.x - 50,
        so.at.y + 25
      );
      this.points.__scaleboxMetricBottomRight = new this.Point(
        so.at.x + 50,
        so.at.y + 25
      );
      this.points.__scaleboxImperialTopLeft = new this.Point(
        so.at.x - 50.8,
        so.at.y - 25.4
      );
      this.points.__scaleboxImperialTopRight = new this.Point(
        so.at.x + 50.8,
        so.at.y - 25.4
      );
      this.points.__scaleboxImperialBottomLeft = new this.Point(
        so.at.x - 50.8,
        so.at.y + 25.4
      );
      this.points.__scaleboxImperialBottomRight = new this.Point(
        so.at.x + 50.8,
        so.at.y + 25.4
      );
      this.paths.__scaleboxImperial = new this.Path()
        .move(this.points.__scaleboxImperialTopLeft)
        .line(this.points.__scaleboxImperialBottomLeft)
        .line(this.points.__scaleboxImperialBottomRight)
        .line(this.points.__scaleboxImperialTopRight)
        .close()
        .attr("style", "fill: #000; stroke: none;");
      this.paths.__scaleboxMetric = new this.Path()
        .move(this.points.__scaleboxMetricTopLeft)
        .line(this.points.__scaleboxMetricBottomLeft)
        .line(this.points.__scaleboxMetricBottomRight)
        .line(this.points.__scaleboxMetricTopRight)
        .close()
        .attr("style", "fill: #FFF; stroke: none;");
      // Lead
      this.points.__scaleboxLead = new this.Point(so.at.x - 45, so.at.y - 15)
        .attr("data-text", so.lead || "freesewing")
        .attr("data-text-class", "text-sm");
      // Title
      this.points.__scaleboxTitle = this.points.__scaleboxLead
        .shift(-90, 10)
        .attr(
          "data-text",
          so.title ||
            this.context.config.name + " v" + this.context.config.version
        )
        .attr("data-text-class", "text-lg");
      // Text
      this.points.__scaleboxText = this.points.__scaleboxTitle.shift(-90, 8);
      if (typeof so.text === "string") {
        this.points.__scaleboxText.attr("data-text", so.text);
      } else {
        this.points.__scaleboxText
          .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
          .attr("data-text", "\n")
          .attr("data-text", "withTheFinancialSupportOfOurPatrons");
        this.points.__scaleboxLink = this.points.__scaleboxText
          .shift(-90, 8)
          .attr("data-text", "freesewing.org/patrons/join")
          .attr("data-text-class", "text-xs fill-note");
      }
      this.points.__scaleboxText
        .attr("data-text-class", "text-xs")
        .attr("data-text-lineheight", 4);
      // Instructions
      this.points.__scaleboxMetric = new this.Point(so.at.x, so.at.y + 20)
        .attr("data-text", "theWhiteInsideOfThisBoxShouldMeasure")
        .attr("data-text", "10cm x 5cm")
        .attr("data-text-class", "text-xs center");
      this.points.__scaleboxImperial = new this.Point(so.at.x, so.at.y + 24)
        .attr("data-text", "theBlackOutsideOfThisBoxShouldMeasure")
        .attr("data-text", '4" x 2"')
        .attr("data-text-class", "text-xs center ");
    }
  }
};
