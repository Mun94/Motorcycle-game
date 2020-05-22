const c = document.createElement("canvas");
const ctx = c.getContext("2d");
c.width = 500;
c.height = 350;
document.body.appendChild(c);//c를 body의 자식요소로 넣는다.

let perm =[];
while(perm.length < 225)
{
    while(perm.includes(val = Math.floor(Math.random()*255))); //includes()메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
    perm.push(val);
}

const lerp = (a,b,t) => a+(b-a)*(1-Math.cos(t*Math.PI))/2;
const noise = x => {
    x = x *0.01% 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x-Math.floor(x));
}

let t = 0; //line 이동하기 위해 t 변수 선언
const loop = () => {
    t += 1.5;
    ctx.fillStyle="blue";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "black";
    ctx.beginPath(); //새로운 경로를 만듭니다. 경로가 생성됐다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다.

    ctx.moveTo(0, c.height); //이전 경로의 끝점이 다음 그려지는 경로의 시작점이 됩니다. 또한 시작점은 moveTo() 메소드를 통해 변경될 수 있습니다.(특정 시작점 설정)
    for(let i =0; i<c.width; i++)
    ctx.lineTo(i, c.height-noise(t + i) * 0.25);// 중심점의 x,y로 부터, lineto의 x,y로 선이 그어지는것이다.
    ctx.lineTo(c.width, c.height);
    ctx.fill(); //fill() 메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채웁니다.(내부가 채워진 도형을 그립니다.) arr.fill(value, start, end)

    requestAnimationFrame(loop);
}

loop();
