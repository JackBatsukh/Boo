(function () {
  function r(a) {
    gsap.killTweensOf(a, { opacity: !0 });
    gsap.fromTo(
      a,
      { opacity: 1 },
      { duration: 0.07, opacity: Math.random(), repeat: -1 }
    );
  }
  function t(a) {
    e &&
      ((a = l[d]),
      gsap.set(a, {
        x: gsap.getProperty(".pContainer", "x"),
        y: gsap.getProperty(".pContainer", "y"),
        scale: m(),
      }),
      gsap.timeline().to(a, {
        duration: gsap.utils.random(0.61, 6),
        physics2D: {
          velocity: gsap.utils.random(-23, 23),
          angle: gsap.utils.random(-180, 180),
          gravity: gsap.utils.random(-6, 50),
        },
        scale: 0,
        rotation: gsap.utils.random(-123, 360),
        ease: "power1",
        onStart: r,
        onStartParams: [a],
        onRepeat: function (b) {
          gsap.set(b, { scale: m() });
        },
        onRepeatParams: [a],
      }),
      d++,
      (d = 201 <= d ? 0 : d));
  }
  MorphSVGPlugin.convertToPath("polygon");
  document.querySelector(".pContainer");
  var u = document.querySelector(".mainSVG");
  document.querySelector("#star");
  var c = document.querySelector(".sparkle");
  document.querySelector("#tree");
  var e = !0,
    n =
      "#E8F6F8 #ACE8F8 #F6FBFE #A2CBDC #B74551 #5DBA72 #910B28 #910B28 #446D39".split(
        " "
      ),
    p = ["#star", "#circ", "#cross", "#heart"],
    l = [],
    d = 0;
  gsap.set("svg", { visibility: "visible" });
  gsap.set(c, { transformOrigin: "50% 50%", y: -100 });
  c = function (a) {
    var b = [],
      f = MotionPathPlugin.getRawPath(a)[0];
    f.forEach(function (v, g) {
      var h = {};
      h.x = f[2 * g];
      h.y = f[2 * g + 1];
      g % 2 && b.push(h);
    });
    return b;
  };
  c(".treePath");
  var q = c(".treeBottomPath");
  c = gsap.timeline({ delay: 0, repeat: 0 });
  var k,
    m = gsap.utils.random(0.5, 3, 0.001, !0);
  (function () {
    for (var a = 201, b; -1 < --a; )
      (b = document.querySelector(p[a % p.length]).cloneNode(!0)),
        u.appendChild(b),
        b.setAttribute("fill", n[a % n.length]),
        b.setAttribute("class", "particle"),
        l.push(b),
        gsap.set(b, { x: -100, y: -100, transformOrigin: "50% 50%" });
  })();
  (function () {
    k = gsap.timeline({ onUpdate: t });
    k.to(".pContainer, .sparkle", {
      duration: 6,
      motionPath: { path: ".treePath", autoRotate: !1 },
      ease: "linear",
    })
      .to(".pContainer, .sparkle", {
        duration: 1,
        onStart: function () {
          e = !1;
        },
        x: q[0].x,
        y: q[0].y,
      })
      .to(
        ".pContainer, .sparkle",
        {
          duration: 2,
          onStart: function () {
            e = !0;
          },
          motionPath: { path: ".treeBottomPath", autoRotate: !1 },
          ease: "linear",
        },
        "-=0"
      )
      .from(
        ".treeBottomMask",
        { duration: 2, drawSVG: "0% 0%", stroke: "#FFF", ease: "linear" },
        "-=2"
      );
  })();
  c.from([".treePathMask", ".treePotMask"], {
    drawSVG: "0% 0%",
    stroke: "#FFF",
    stagger: { each: 6 },
    duration: gsap.utils.wrap([6, 1, 2]),
    ease: "linear",
  })
    .from(
      ".treeStar",
      {
        duration: 3,
        scaleY: 0,
        scaleX: 0.15,
        transformOrigin: "50% 50%",
        ease: "elastic(1,0.5)",
      },
      "-=4"
    )
    .to(
      ".sparkle",
      {
        duration: 3,
        opacity: 0,
        ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})",
      },
      "-=0"
    )
    .to(
      ".treeStarOutline",
      {
        duration: 1,
        opacity: 1,
        ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})",
      },
      "+=1"
    );
  c.add(k, 0);
  gsap.globalTimeline.timeScale(1.5);
  k.vars.onComplete = function () {
    gsap.to("#endMessage", { opacity: 1 });
  };
})();




// tsas
let snowflakesCount = 200; // Snowflake count, can be overwritten by attrs
let baseCSS = ``;

// set global attributes
if (typeof SNOWFLAKES_COUNT !== "undefined") {
  snowflakesCount = SNOWFLAKES_COUNT;
}
if (typeof BASE_CSS !== "undefined") {
  baseCSS = BASE_CSS;
}

let bodyHeightPx = null;
let pageHeightVh = null;

function setHeightVariables() {
  bodyHeightPx = document.body.offsetHeight;
  pageHeightVh = (100 * bodyHeightPx) / window.innerHeight;
}

// get params set in snow div
function getSnowAttributes() {
  const snowWrapper = document.getElementById("snow");
  snowflakesCount = Number(snowWrapper?.dataset?.count || snowflakesCount);
}

// This function allows you to turn on and off the snow
function showSnow(value) {
  if (value) {
    document.getElementById("snow").style.display = "block";
  } else {
    document.getElementById("snow").style.display = "none";
  }
}

// Creating snowflakes
function generateSnow(snowDensity = 200) {
  snowDensity -= 1;
  const snowWrapper = document.getElementById("snow");
  snowWrapper.innerHTML = "";
  for (let i = 0; i < snowDensity; i++) {
    let board = document.createElement("div");
    board.className = "snowflake";
    snowWrapper.appendChild(board);
  }
}

function getOrCreateCSSElement() {
  let cssElement = document.getElementById("psjs-css");
  if (cssElement) return cssElement;

  cssElement = document.createElement("style");
  cssElement.id = "psjs-css";
  document.head.appendChild(cssElement);
  return cssElement;
}

// Append style for each snowflake to the head
function addCSS(rule) {
  const cssElement = getOrCreateCSSElement();
  cssElement.innerHTML = rule; // safe to use innerHTML
  document.head.appendChild(cssElement);
}

// Math
function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Create style for snowflake
function generateSnowCSS(snowDensity = 200) {
  let snowflakeName = "snowflake";
  let rule = baseCSS;

  for (let i = 1; i < snowDensity; i++) {
    let randomX = Math.random() * 100; // vw
    let randomOffset = Math.random() * 10; // vw;
    let randomXEnd = randomX + randomOffset;
    let randomXEndYoyo = randomX + randomOffset / 2;
    let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
    let randomScale = Math.random();
    let fallDuration = randomIntRange(10, (pageHeightVh / 10) * 3); // s
    let fallDelay = randomInt((pageHeightVh / 10) * 3) * -1; // s
    let opacity = Math.random();

    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `;
  }
  addCSS(rule);
}

// Load the rules and execute after the DOM loads
function createSnow() {
  setHeightVariables();
  getSnowAttributes();
  generateSnowCSS(snowflakesCount);
  generateSnow(snowflakesCount);
}

window.addEventListener("resize", createSnow);

// export createSnow function if using node or CommonJS environment
if (typeof module !== "undefined") {
  module.exports = {
    createSnow,
    showSnow,
  };
} else {
  window.onload = createSnow;
}
