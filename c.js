// https://github.com/servetgulnaroglu/cube.c/issues/2

var showcube = false;

let A = 0, B = 0, C = 1;

// viewport
let width = 160
let height = 44
let viewportarea = width * height;

// holds the characters for the viewport
let buffer = Array(viewportarea).fill(' ');
// z order for characters in the viewport
let zbuffer = Array(viewportarea).fill(0);

let distance = 60;

// boring cube stuff
let incrementSpeed = 0.6;
let cubeWidth = 10;
let cubeHeight = 20;

function calcX (i, j ,k)
{
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) + j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
};

function calcY (i, j, k)
{
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) - 
           j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) - 
           i * Math.cos(B) * Math.sin(C);
};

function calcZ (i, j, k)
{
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
};


function calculateForSurface(cubeX, cubeY, cubeZ, char)
{
    x = calcX(cubeX, cubeY, cubeZ);
    y = calcY(cubeX, cubeY, cubeZ);
    z = calcZ(cubeX, cubeY, cubeZ) + distance;

    // Reciprocal of z
    let ooz = 1/z;

    // map each x and y of the 3d cube to the 2d point
    xp = Math.round(width / 2 + 40 * ooz * x * 2);
    yp = Math.round(height / 2 + 40 * ooz * y);

    idx = xp + yp * width;
    if ((idx >= 0) && (idx < viewportarea))
    {
        if (ooz > zbuffer[idx])
        {
            zbuffer[idx] = ooz;
            buffer[idx] = char;
        }
    }

}

function spin()
{
    // empty buffers for new loop
    zbuffer = Array(viewportarea).fill(0);
    buffer = Array(viewportarea).fill(' ');

    for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed)
    {
        for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed)
        {
            //calculateForSurface(cubeX, cubeY, -cubeWidth, '#');
            calculateForSurface(cubeWidth, cubeY, cubeX, '$');
            calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
            //calculateForSurface(-cubeX, cubeY, cubeWidth, '@');
            //calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
            //calculateForSurface(cubeX, cubeWidth, cubeY, '+');
        }
    }

    let line = "";
    for (let k = 0; k < viewportarea; k++) 
    {
        line += buffer[k];
        if ((k + 1) % width == 0) 
        {
            line += "<br>";
        }
    }
    document.getElementById("output").innerHTML = line;

    A += 0.01;
    B += 0.01;
    C += 0.0;
    if (showcube == true)
    {
        window.requestAnimationFrame(spin);
    }
    if (showcube == false) 
    {
        document.getElementById("output").innerHTML = '';
    }
}

function togglecube()
{
    if (showcube == false)
    { // turn on
        window.requestAnimationFrame(spin);
        showcube = true;
        document.getElementById("cubebutton").innerHTML = 'hide me the cube';
        return;
    }
    if (showcube == true)
    { // turn off
        showcube = false;
        document.getElementById("cubebutton").innerHTML = 'show me the cube';
        return;
    }
}



