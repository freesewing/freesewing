var version = require('../../package.json').version

var render = {
  boilerplate: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="0mm" height="0mm" viewBox="0 0 0 0"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">
</g>
<!-- end of group #fs-container -->
</svg>`,
  boilerplateNl: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="nl" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="0mm" height="0mm" viewBox="0 0 0 0"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">
</g>
<!-- end of group #fs-container -->
</svg>`,
  embed: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
     xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" viewBox="0 0 0 0"
     >
     <style type="text/css"> <![CDATA[
     ]]>
     </style>
     <script type="text/javascript"> <![CDATA[

     ]]>
       </script>
       <defs>

       </defs>


       <!-- Start of group #fs-container -->
       <g id="fs-container">
       </g>
       <!-- end of group #fs-container -->
       </svg>`,
  part: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="4mm" height="4mm" viewBox="0 0 4 4"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  path: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="44mm" height="56.45mm" viewBox="0 0 44 56.451075975520425"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<path  id="something" class="freesewing" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  text: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="4mm" height="4mm" viewBox="0 0 4 4"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<text  class="text-lg" x="20" y="20"><tspan>This is a test</tspan>
</text>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  circle: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="104mm" height="104mm" viewBox="0 0 104 104"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(32, 32)"><circle
    cx="20"
    cy="20"
    r="50"

  ></circle>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  multiText: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
     xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="4mm" height="4mm" viewBox="0 0 4 4"
     >
     <style type="text/css"> <![CDATA[
     ]]>
     </style>
     <script type="text/javascript"> <![CDATA[

     ]]>
       </script>
       <defs>

       </defs>


       <!-- Start of group #fs-container -->
       <g id="fs-container">

       <!-- Start of group #fs-part-test -->
       <g id="fs-part-test"  transform=" translate(2, 2)">
       <text  class="text-lg" x="20" y="20"><tspan>This is a test</tspan><tspan x="20" dy="8">with text on</tspan><tspan x="20" dy="8">multiple lines</tspan>
       </text>
       </g>
       <!-- end of group #fs-part-test -->
       </g>
       <!-- end of group #fs-container -->
       </svg>`,
  multiTextDflt: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
     xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="4mm" height="4mm" viewBox="0 0 4 4"
     >
     <style type="text/css"> <![CDATA[
     ]]>
     </style>
     <script type="text/javascript"> <![CDATA[

     ]]>
       </script>
       <defs>

       </defs>


       <!-- Start of group #fs-container -->
       <g id="fs-container">

       <!-- Start of group #fs-part-test -->
       <g id="fs-part-test"  transform=" translate(2, 2)">
       <text  class="text-lg" x="20" y="20"><tspan>This is a test</tspan><tspan x="20" dy="6">with text on</tspan><tspan x="20" dy="6">multiple lines</tspan>
       </text>
       </g>
       <!-- end of group #fs-part-test -->
       </g>
       <!-- end of group #fs-container -->
       </svg>`,
  textOnPath: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="44mm" height="56.45mm" viewBox="0 0 44 56.451075975520425"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<path  data-text="This is another test" data-text-class="text-sm" class="freesewing" id="fs-1" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#fs-1" ><tspan  class="text-sm">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  textOnPathCenter: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="44mm" height="56.45mm" viewBox="0 0 44 56.451075975520425"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<path  data-text="This is another test" data-text-class="center" class="freesewing" id="fs-1" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#fs-1"  startOffset="50%" ><tspan  class="center">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  textOnPathRight: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="44mm" height="56.45mm" viewBox="0 0 44 56.451075975520425"
>
<style type="text/css"> <![CDATA[
]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<path  data-text="This is another test" data-text-class="right" class="freesewing" id="fs-1" d="M 0,0 L 40,20 C 12,34 56,78 21,32 z" />
<text><textPath xlink:href="#fs-1"  startOffset="100%" ><tspan  class="right">This is another test</tspan></textPath>
</text>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`,
  snippet: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
 xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="en" xmlns:freesewing="http://freesewing.org/namespaces/freesewing" freesewing="${version}" width="4mm" height="4mm" viewBox="0 0 4 4"
>
<style type="text/css"> <![CDATA[

]]>
</style>
<script type="text/javascript"> <![CDATA[

]]>
</script>
<defs>

</defs>


<!-- Start of group #fs-container -->
<g id="fs-container">

<!-- Start of group #fs-part-test -->
<g id="fs-part-test"  transform="translate(2, 2)">
<use x="20" y="20" xlink:href="#test"  transform="translate(20, 20) scale(1) translate(-20, -20)"></use>
</g>
<!-- end of group #fs-part-test -->
</g>
<!-- end of group #fs-container -->
</svg>`
}

module.exports = render
