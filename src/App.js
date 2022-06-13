import "./styles.css";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const style = { width: 600, margin: 50 };

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(DrawSVGPlugin);


export default function App() {

  const startScale = 0.4;
  const secondScale = 0.6;
  const thirdScale = 0.7;
  const fourthScale = 0.9;
  const fifthScale = 1.5;
  const sixthScale = 2.5;

  const [t1, setT1] = useState();
  const [t2, setT2] = useState();
  const [mercuryTimeline, setMercuryTimeline] = useState();
  const [venusTimeline, setVenusTimeline] = useState();
  const [earthTimeline, setEarthTimeline] = useState();
  const [marsTimeline, setMarsTimeline] = useState();
  const [jupiterTimeline, setJupiterTimeline] = useState();
  const [saturnTimeline, setSaturnTimeline] = useState();
  const [uranusTimeline, setUranusTimeline] = useState();
  const [neptuneTimeline, setNeptuneTimeline] = useState();
  const [cometTimeline, setCometTimeline] = useState();

  const [value, setValue] = useState(0);
  const sliderProps = {
    min: 0.0,
    max: 1.0,
    step: 0.001
  };

  const updateSlider = () => {
    setValue(t1.progress());
  }

  const onSliderChange = (val) => {
    console.log("val = ", val);
    console.log("t2 = ", t2, " ", t2.duration());
    t1 && t1.progress(val); 
    t2 && t2.progress(val);
  }

  const onBeforeChange = () => {
    t1 && t1.pause();
    t2 && t2.pause();
  }

  const onAfterChange = (val) => {
    setValue(val);
	};

  useEffect(() => {
    gsap.set('#galaxy', {transformStyle:"preserve-3d", rotationX: 0})
    gsap.set('#sun', {transformStyle:"preserve-3d", rotationX: 0})
    gsap.set('.orbit', {transformStyle:"preserve-3d"})
    gsap.set('.pos', {transformStyle:"preserve-3d", perspective: 100})
    gsap.set('.planet', {transformStyle:"preserve-3d"})
    gsap.set('.ring', {transformStyle:"preserve-3d", rotationX: 80})
    gsap.set("#galaxy", {
      transformOrigin: "center",
      scale: startScale,
      // xPercent: -50,
      // yPercent: -50  
    });
    gsap.set("#faster, #slower", {
      opacity: 0
    });

    t1 && t1.to("#galaxy", 1, { scale: startScale, ease: "none", delay: 0, onUpdate:updateSlider }, 0)
    .to("#system", 0.1, { opacity: 0, delay: 2.5, onUpdate:updateSlider }, 0)
    .to("#galaxy", 1, { scale: secondScale, ease: "none", delay: 2, onUpdate:updateSlider }, 0)
    .to("#faster", 0.1, { opacity: 1, delay: 3, onUpdate:updateSlider }, 0)
    .to("#galaxy", 0.6, { scale: thirdScale, ease: "none", delay: 4, onUpdate:updateSlider }, 0)
    .to("#slower", 0.1, { opacity: 1, delay: 4.6, onUpdate:updateSlider }, 0)
    .to("#galaxy", 1, { scale: fourthScale, ease: "none", delay: 6, onUpdate:updateSlider }, 0)
    .to("#faster, #slower", 0.1, { opacity: 0, delay: 7, onUpdate:updateSlider }, 0)
    .to("#galaxy", 1, { scale: fifthScale, ease: "none", delay: 8, onUpdate:updateSlider}, 0)
    .to("#galaxy", 1, { scale: sixthScale, ease: "none", delay: 10, onUpdate:updateSlider}, 0)

    t2 && t2.set("#arrow",{opacity: 0, xPercent:-50, yPercent:-50,  transformOrigin:"center"});

    t2 && t2.from("#line", 1, {drawSVG: 1, ease:"none", delay: 4})
      .to("#arrow", {
        duration: 0.001, 
        opacity: 1,
        ease: "none",
      }, "-=1")
      .to("#arrow", {
        duration: 1, 
        ease: "none",
        motionPath:{
          path: "#line",
          align: "#line",
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        }
      }, "-=1")
      .to("#arrow, #line", {
        duration: 0.001, 
        opacity: 0,
        ease: "none",
      }, "+=0.5");
  }, [t1, t2]);

  useEffect(() => {
    mercuryTimeline && mercuryTimeline.fromTo('#mercury', 0.79, {rotation: 0}, {rotation: -360})
  }, [mercuryTimeline]);

  useEffect(() => {
    venusTimeline && venusTimeline.fromTo('#venus', 0.48, {rotation: 0}, {rotation: -360}, 0)
  }, [venusTimeline]);

  useEffect(() => {
    earthTimeline && earthTimeline.fromTo('#earth', 0.77, {rotation: 0}, {rotation: -360}, 0)
  }, [earthTimeline]);

  useEffect(() => {
    marsTimeline && marsTimeline.fromTo('#mars', 0.98, {rotation: 0}, {rotation: -360}, 0)
  }, [marsTimeline]);

  useEffect(() => {
    jupiterTimeline && jupiterTimeline.fromTo('#jupiter', 9.42, {rotation: 0}, {rotation: -360}, 0)
    jupiterTimeline && jupiterTimeline.seek(1);
  }, [jupiterTimeline]);

  useEffect(() => {
    saturnTimeline && saturnTimeline.fromTo('#saturn', 22.8, {rotation: 0}, {rotation: -360}, 0)
    saturnTimeline && saturnTimeline.seek(10);
  }, [saturnTimeline]);

  useEffect(() => {
    uranusTimeline && uranusTimeline.fromTo('#uranus', 65.3, {rotation: 0}, {rotation: -360}, 0)
  }, [uranusTimeline]);

  useEffect(() => {
    neptuneTimeline && neptuneTimeline.fromTo('#neptune', 125.2, {rotation: 0}, {rotation: -360}, 0)
  }, [neptuneTimeline]);

  useEffect(() => {
    cometTimeline && cometTimeline.fromTo('#comet', 0.25, {rotation: 30, scaleY: 0}, {rotation: 30, scaleY: 1, x: -1300, y: 1500})
  }, [cometTimeline]);

  useEffect(() => {
    const t1 = gsap.timeline()
    setT1(t1);

    const t2 = gsap.timeline()
    setT2(t2);

    const mercuryTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setMercuryTimeline(mercuryTimeline);

    const venusTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setVenusTimeline(venusTimeline);

    const earthTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setEarthTimeline(earthTimeline);

    const marsTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setMarsTimeline(marsTimeline);

    const jupiterTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setJupiterTimeline(jupiterTimeline);

    const saturnTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setSaturnTimeline(saturnTimeline);

    const uranusTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setUranusTimeline(uranusTimeline);

    const neptuneTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setNeptuneTimeline(neptuneTimeline);

    const cometTimeline = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
    setCometTimeline(cometTimeline);
  }, []);

  return (
    <div className="App">
      <div id="universe">
        <div class="ribbon">
          <a href="https://github.com/RisingStar522/solar-system">Fork me on GitHub</a>
        </div>
        <svg id="svg1"  viewBox="0 0 3000 3000" width="100%" height="100%">
          <g id="view">
          <path id="line" fill="none" stroke="#FFF" strokeWidth="300" d="M-449.522,2930.315C-449.522,2930.315,-290.268,2566.442,-239.745,2375.107,-188.863,2182.414,-167.946,2064.19,-149.78,1825.008,-131.613,1585.821,-145.419,1505.148,-173.634,1300.573,-201.165,1100.956,-294.356,771.64,-294.356,771.64"/>
          <path id="arrow" stroke="#FFF" strokeWidth="450" d="M465.7 172.9l47.1 6-29.8 33.3-17.3-39.3z"/>
          </g>
        </svg>
        <Slider
            id="slider"
            value={value}
            onChange={onSliderChange}
            onBeforeChange={onBeforeChange}
            onAfterChange={onAfterChange}
            style={style}
            {...sliderProps}
          />
        <div id="galaxy">
          <div id="system">THE SOLAR SYSTEM</div>
          <div id="faster">--FASTER</div>
          <div id="slower">SLOWER----</div>
          <div id="sun">
          </div>
          <div id="comet">
          </div>
          <div id="mercury" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="venus" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="earth" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="mars" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="jupiter" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="saturn" className="orbit">
            <div className="pos">
                <div className="planet">
                  <div className="ring"></div>
                </div> 
            </div>
          </div>
          <div id="uranus" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
          <div id="neptune" className="orbit">
            <div className="pos">
                <div className="planet"></div> 
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
