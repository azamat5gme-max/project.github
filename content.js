(function (root) {
  'use strict';
  const pictures = [
    {file:'assets/basin.jpg',alt:'The Indus River flowing between mountains in Pakistan.',caption:'The Indus River · Pakistan',author:'Amjad Bilal / Sherazyousafzai2018',source:'https://commons.wikimedia.org/wiki/File:Indus_River.jpg',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/'},
    {file:'assets/treaty.jpg',alt:'Tarbela Dam and its reservoir on the Indus River in Pakistan.',caption:'Tarbela Dam · Pakistan',author:'Shahzeb Cheema',source:'https://commons.wikimedia.org/wiki/File:Tarbela_Dam_Main.jpg',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
    {file:'assets/conflict.jpg',alt:'A false-colour Landsat satellite image showing flooding along the Indus River on August 28, 2022.',caption:'Flooding along the Indus · August 28, 2022',author:'NASA Earth Observatory / Joshua Stevens / USGS',source:'https://science.nasa.gov/earth/earth-observatory/devastating-floods-in-pakistan-150279/',license:'NASA imagery',licenseUrl:'https://www.nasa.gov/nasa-brand-center/images-and-media/'},
    {file:'assets/future.jpg',alt:'The Indus and Zanskar rivers joining in Ladakh, India.',caption:'Indus–Zanskar confluence · Ladakh',author:'Bernard Gagnon',source:'https://commons.wikimedia.org/wiki/File:Confluence_of_Indus_and_Zanskar_rivers.jpg',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
    {file:'assets/conclusion.jpg',alt:'The Indus River beneath mountain peaks at Skardu, Pakistan.',caption:'The Indus at Skardu · Pakistan',author:'Zacharie Grossen',source:'https://commons.wikimedia.org/wiki/File:Indus_at_Skardu.jpg',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
    {file:'assets/sources.jpg',alt:'A Landsat satellite image of the lower Indus River and surrounding fields from October 19, 2009.',caption:'Lower Indus River · Landsat, October 19, 2009',author:'NASA / Robert Simmon / Landsat 5',source:'https://science.nasa.gov/earth/earth-observatory/indus-river-pakistan-43890/',license:'NASA imagery',licenseUrl:'https://www.nasa.gov/nasa-brand-center/images-and-media/'}
  ];
  const slides = [
    {
      title:'The Indus River Basin:',shortTitle:'The basin',chapter:'01 / THE BASIN',theme:'basin',picture:pictures[0],
      blocks:[
        {label:'A shared river system',text:'A major transboundary drainage system in South Asia covering about 1,120,000 to 1,165,000 square kilometers across Pakistan, India, China, and Afghanistan.'},
        {label:'-Why is it important?',text:'It supports a population of roughly 237 to 300 million people.'}
      ]
    },
    {
      title:'What is the Indus Water Treaty, why is it important?',shortTitle:'The treaty',chapter:'02 / THE TREATY',theme:'treaty',picture:pictures[1],
      blocks:[
        {label:'The agreement',text:'The Indus Water Treaty signed in 1960 with World Bank mediation, governs 6 rivers in the Indus water system that support the livelihoods, energy generation, irrigation, as well as cities and ecosystems of nearly 300 million people. It serves as the agricultural backbone primarily for Pakistan and India.'},
        {label:'For decades',text:'For decades this treaty helped to sustain peace and prevent diplomatic crises from occurring in the region.'},
        {label:'Changing conditions',text:'However, environmental, social, and economic needs and conditions significantly transformed throughout its lifetime.'},
        {label:'Growing pressure',text:'Climate change is intensifying floods and droughts, seasonal and annual water availability trends and patterns. Growing populations and economic activity in the region, growing cities and industrial use, enormously increase the demand for water.'}
      ]
    },
    {
      title:'The treaty under pressure',shortTitle:'The conflict',chapter:'03 / THE CONFLICT',theme:'conflict',picture:pictures[2],
      blocks:[
        {label:'A changing century',text:'In the meantime, a treaty that was designed and adapted to the climate conditions and economic environment of the 20th century now fails to sustain a stable cohesion between the parties.'},
        {label:'The present situation',text:'At present, India’s recent declaration to place the treaty in abeyance after a deadly attack on civilians in the Jammu and Kashmir region casts doubt on the treaty’s existence and role in the future.'}
      ]
    },
    {
      title:'Future of the conflict',shortTitle:'The future',chapter:'04 / THE FUTURE',theme:'future',picture:pictures[3],
      blocks:[
        {label:'Possible outcomes',text:'The recent PennsState institute of energy and the environment article hypothesizes that the current instability and conflict over water resources could:'},
        {label:'A possible path',text:'1. Incentivize cooperation',kind:'outcome'},
        {label:'A possible path',text:'2. Catalyze reforms',kind:'outcome'}
      ]
    },
    {
      title:'Conclusion',shortTitle:'Conclusion',chapter:'05 / CONCLUSION',theme:'conclusion',picture:pictures[4],
      blocks:[
        {label:'Looking ahead',text:'In a nutshell, the current friction, optimistically speaking, fosters a stronger cooperation and creates a new way of managing water in the region peacefully.'}
      ]
    },
    {
      title:'Sources & picture credits',shortTitle:'Sources',chapter:'06 / SOURCES',theme:'sources',picture:pictures[5],
      blocks:[
        {label:'Information references',kind:'references',links:[
          {label:'Penn State · Institute of Energy and the Environment',detail:'Lara Fowler and Christopher Scott · March 27, 2026',url:'https://iee.psu.edu/news/blog/why-key-india-pakistan-water-treaty-under-strain-and-why-it-matters-globally'},
          {label:'World Bank · Indus Waters Treaty fact sheet',detail:'The 1960 treaty and the role of the World Bank',url:'https://www.worldbank.org/en/region/sar/brief/fact-sheet-the-indus-waters-treaty-1960-and-the-world-bank'},
          {label:'NASA Earth Observatory · Indus imagery',detail:'Satellite photographs and their dates',url:'https://science.nasa.gov/earth/earth-observatory/devastating-floods-in-pakistan-150279/'}
        ]},
        {label:'Picture credits',kind:'credits',pictures:pictures}
      ]
    }
  ];
  const data = {slides:slides,pictures:pictures};
  if (typeof module === 'object' && module.exports) module.exports=data;
  else root.IndusContent=data;
})(typeof window !== 'undefined' ? window : globalThis);
