"use strict";

const nbx = 7;
const nby = 7;
const nbz = 7;
const cubeSize = 0.4; // cubes centers are spaced by 1

let canv, ctx; // canvas and context : global variables (I know :( )
let maxx, maxy; // canvas sizes (in pixels)
let xc, yc; // canvas center;

let arCubes; // array of cubes

// shortcuts for Math.…

const mrandom = Math.random;
const mfloor = Math.floor;
const mround = Math.round;
const mceil = Math.ceil;
const mabs = Math.abs;
const mmin = Math.min;
const mmax = Math.max;

const mPI = Math.PI;
const mPIS2 = Math.PI / 2;
const m2PI = Math.PI * 2;
const msin = Math.sin;
const mcos = Math.cos;
const matan2 = Math.atan2;
const mtan = Math.tan;

const mhypot = Math.hypot;
const msqrt = Math.sqrt;

const rac3 = msqrt(3);
const rac3s2 = rac3 / 2;
const mPIS3 = Math.PI / 3;

let projxx;
let projxy;

let projyx;
let projyy;

let projzx;
let projzy;

// for animation
let click;
let buttOn; // button on
let xMouse, yMouse;
let display = false;
let redraw = false;
let pts;
let proj;

function Noise1DOneShot(period, min = 0, max = 1, random) {
  /* returns a 1D single-shot noise generator.
           the (optional) random function must return a value between 0 and 1
          the returned function has no parameter, and will return a new number every tiime it is called.
          If the random function provides reproductible values (and is not used elsewhere), this
          one will return reproductible values too.
          period should be > 1. The bigger period is, the smoother output noise is
        */
  random = random || Math.random;
  let currx = random(); // start with random offset
  let y0 = min + (max - min) * random(); // 'previous' value
  let y1 = min + (max - min) * random(); // 'next' value
  let dx = 1 / period;

  return function () {
    currx += dx;
    if (currx > 1) {
      currx -= 1;
      y0 = y1;
      y1 = min + (max - min) * random();
    }
    let z = (3 - 2 * currx) * currx * currx;
    return z * y1 + (1 - z) * y0;
  };
} // Noise1DOneShot

//-----------------------------------------------------------------------------
// cube defined by center
class Cube {
  constructor(xc, yc, zc, color) {
    const cs2 = cubeSize / 2;
    const x0 = xc - cs2;
    const x1 = xc + cs2;
    const y0 = yc - cs2;
    const y1 = yc + cs2;
    const z0 = zc - cs2;
    const z1 = zc + cs2;

    this.pts = [
      [x0, y0, z0],
      [x1, y0, z0],
      [x0, y1, z0],
      [x1, y1, z0],
      [x0, y0, z1],
      [x1, y0, z1],
      [x0, y1, z1],
      [x1, y1, z1]
    ];
    this.color = color;
  } // Cube

  projScreen() {
    this.pscr = proj.projection(this.pts);
  }

  drawFaces() {
    const pscr = this.pscr;
    ctx.strokeStyle = "#000";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    drawFace([0, 1, 3, 2]);
    drawFace([1, 5, 7, 3]);
    drawFace([4, 6, 7, 5]);
    drawFace([0, 2, 6, 4]);
    drawFace([2, 3, 7, 6]);
    drawFace([0, 4, 5, 1]);

    function drawFace(indVertices) {
      let [p0, p1, p2, p3] = indVertices.map((k) => pscr[k]);
      // check face visibility
      if (
        (p1[0] - p0[0]) * (p2[1] - p1[1]) - (p1[1] - p0[1]) * (p2[0] - p1[0]) <
        0
      )
        return; // invisible face
      ctx.beginPath();
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } // drawLine
  }
} // class Cube

//-----------------------------------------------------------------------------

function line(p0, p1) {
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  ctx.lineTo(p1[0], p1[1]);
  //  ctx.lineWidth = 2; use current value
  //  ctx.strokeStyle = color; use current value
  ctx.stroke();
} // line

//-----------------------------------------------------------------------------

function createTranslation(depl) {
  const [dx, dy, dz] = depl;

  function apply(p) {
    // p may be a single point or an array of points
    // but not an array of arrays of points

    if (p[0].length !== 3)
      // single point
      return [p[0] + dx, p[1] + dy, p[2] + dz];
    // array of points
    else return p.map((pt) => [pt[0] + dx, pt[1] + dy, pt[2] + dz]);
  } //
  return {
    dx: dx,
    dy: dy,
    dz: dz,
    apply: apply
  };
} // createTranslation

//-----------------------------------------------------------------------------

function createRotation(thx, thy) {
  // rotate around y axis, then around x axis

  const sx = msin(thx);
  const cx = mcos(thx);
  const sy = msin(thy);
  const cy = mcos(thy);
  const a10 = sx * sy;
  const a12 = -sx * cy;
  const a20 = -sy * cx;
  const a22 = cx * cy;

  function apply(p) {
    // p may be a single point or an array of points
    // but not an array og arrays of points

    if (p[0].length !== 3) {
      // single point
      let [x, y, z] = p;
      return [
        cy * x + sy * z,
        a10 * x + cx * y + a12 * z,
        a20 * x + sx * y + a22 * z
      ];
    } else {
      // array of points
      return p.map((pt) => {
        let [x, y, z] = pt;
        return [
          cy * x + sy * z,
          a10 * x + cx * y + a12 * z,
          a20 * x + sx * y + a22 * z
        ];
      });
    }
  } //
  return {
    thx: thx,
    thy: thy,
    apply: apply
  };
} // createTranslation

//-----------------------------------------------------------------------------

function createPerspective3(pcam, pLookAt, a, th, resx, resy) {
  /* pcam : array of 3 coordinates, position of the camera
          pLookAt : point the camera is looking at
        a distance from the observer to the projection screen
        th (angle of the width of the screen seen by the observer
        resx, resy : number of pixels of the screen
        */
  const resx2 = resx / 2;
  const resy2 = resy / 2;
  const th2 = th / 2; // for easier calculations
  const b = a * mtan(th2);
  const proj = (a * resx2) / b;
  const transl = createTranslation([-pLookAt[0], -pLookAt[1], -pLookAt[2]]);

  const redpcam = transl.apply(pcam);
  const D = mhypot(redpcam[0], redpcam[1], redpcam[2]);
  const X = redpcam[0] / D;
  const Y = redpcam[1] / D;
  const Z = redpcam[2] / D;
  const m11 = msqrt(1 - Y * Y); // Cx /!\ Y= + / - 1 => Cx = 0
  const m00 = Z / m11; // Cy
  const m02 = -X / m11; // -Sy
  const m10 = Y * m02; // -Y.Sy
  const m12 = -Y * m00; // -Y.Cy
  const m20 = X;
  const m21 = Y;
  const m22 = Z;

  function rotatePoint(point) {
    // rotation for camera position
    return [
      m00 * point[0] + m02 * point[2],
      m10 * point[0] + m11 * point[1] + m12 * point[2],
      m20 * point[0] + m21 * point[1] + m22 * point[2]
    ];
  } // rotatePoint

  function pointToScreen(point) {
    // projection on canvas
    return [
      (point[0] / (D - point[2])) * proj + resx2,
      (-point[1] / (D - point[2])) * proj + resy2,
      point[2]
    ];
  } // pointToScreen

  function projection(spaceCoords) {
    // spaceCoords may be a single point or an array of points
    if (spaceCoords[0].length !== 3)
      // single point
      return pointToScreen(rotatePoint(transl.apply(spaceCoords)));
    // array of points
    else
      return spaceCoords.map((pt) =>
        pointToScreen(rotatePoint(transl.apply(pt)))
      );
  }

  return {
    pcam: pcam,
    pLookAt: pLookAt,
    D: D,
    a: a,
    th: th,
    resx: resx,
    resy: resy,
    projection: projection
  };
} // createPerspective3

//-----------------------------------------------------------------------------
// returns false if nothing can be done, true if drawing done

function startOver() {
  display = false;
  // canvas dimensions

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  canv.style.left = (window.innerWidth - maxx) / 2 + "px";
  canv.style.top = (window.innerHeight - maxy) / 2 + "px";

  ctx.canvas.width = maxx;
  ctx.canvas.height = maxy;
  ctx.lineCap = "round"; // placed here because reset when canvas resized

  if (maxx < 100) return false;
  xc = maxx / 2;
  yc = maxy / 2;

  // create cubes
  arCubes = [];
  for (let kz = 0; kz < nbz; ++kz) {
    let z = kz - (nbz - 1) / 2;
    let blue = 0.2 + (0.8 * kz) / (nbz - 1);
    for (let ky = 0; ky < nby; ++ky) {
      let y = ky - (nby - 1) / 2;
      let green = 0.2 + (0.8 * ky) / (nby - 1);
      for (let kx = 0; kx < nbx; ++kx) {
        let x = kx - (nbx - 1) / 2;
        let red = 0.2 + (0.8 * kx) / (nbx - 1);
        arCubes.push(
          new Cube(x, y, z, `rgb(${255 * red},${255 * green},${255 * blue}`)
        );
      } // kx
    } // ky
  } // kz
  return true; // ok
} // startOver

//------------------------------------------------------------------------
let animate;
{
  let animState = 0;

  let theta = 0;
  let deplR, deply;
  let deplfy;

  function drawLine(ind1, ind2, color) {
    line(pscr[ind1], pscr[ind2], color);
  }

  animate = function (tStamp) {
    let radius;
    window.requestAnimationFrame(animate);

    switch (animState) {
      case 0:
        if (startOver()) {
          deplR = Noise1DOneShot(350, 0.8 * nbz, 2 * nbz);
          deply = Noise1DOneShot(415, -nby / 2, nby / 2);
          deplfy = Noise1DOneShot(420, -nby / 2 - 1, nby / 2 + 1);
          ++animState;
        }

        break;
      case 1:
        ctx.clearRect(0, 0, maxx, maxy);
        theta = (theta + 0.002) % m2PI;
        radius = deplR();
        proj = createPerspective3(
          [radius * msin(theta), deply(), radius * mcos(theta)],
          [0, deplfy(), 0],
          0.5,
          0.5,
          maxx,
          maxy
        );
        arCubes.forEach((cube) => cube.projScreen());
        arCubes.sort((a, b) => a.pscr[0][2] - b.pscr[0][2]); // sort by depth
        arCubes.forEach((cube) => cube.drawFaces());
    } // switch
  }; // animate
} // scope for animate
//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

{
  canv = document.createElement("canvas");
  canv.style.position = "absolute";
  document.body.appendChild(canv);
  ctx = canv.getContext("2d");
} // canvas creation

window.requestAnimationFrame(animate);
click = true; // to run startOver
