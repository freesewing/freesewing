var render = {
  boilerplate: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="0mm" height="0mm" viewBox="0 0 0 0"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  part: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="20mm" height="20mm" viewBox="0 0 20 20"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  path: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="60mm" height="72.45mm" viewBox="0 0 60 72.45"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform=" translate(10, 10)">
<path  id="something" class="freesewing" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  text: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="20mm" height="20mm" viewBox="0 0 20 20"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
<text  class="text-lg" x="20" y="20"><tspan>This is a test</tspan>
</text>
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  textOnPath: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="60mm" height="72.45mm" viewBox="0 0 60 72.45"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
<path  data-text="This is another test" data-text-class="text-sm" class="freesewing" id="2" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#2" ><tspan  class="text-sm">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  textOnPathCenter: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="60mm" height="72.45mm" viewBox="0 0 60 72.45"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
<path  data-text="This is another test" data-text-class="center" class="freesewing" id="2" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#2"  startOffset="50%" ><tspan  class="center">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  textOnPathRight: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="60mm" height="72.45mm" viewBox="0 0 60 72.45"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
<path  data-text="This is another test" data-text-class="right" class="freesewing" id="2" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#2"  startOffset="100%" ><tspan  class="right">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`,
  snippet: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<!--

--><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="0.7.0" width="20mm" height="20mm" viewBox="0 0 20 20"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs id="defs">

</defs>


<!-- Start of group #draftContainer -->
<g id="draftContainer">

<!-- Start of group #1 -->
<g id="1"  transform="translate(10, 10)">
<use x="20" y="20" xlink:href="#test" ><title>This is a snippet</title></use>
</g>
<!-- end of group #1 -->
</g>
<!-- end of group #draftContainer -->
</svg>

<!--

-->`
};

module.exports = render;
