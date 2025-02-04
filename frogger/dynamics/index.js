window.addEventListener("load", ()=>{
    let record = document.getElementById("record");
    if(document.cookie){
        let cookie_record_carga = document.cookie.split('=');    
        record.innerHTML="Record:"+cookie_record_carga[1];
    }
});
    
const canvas = document.getElementById("spaceTravel");
const ctx = canvas.getContext("2d"); 

const mensaje = document.getElementById("mensaje"); 
const vida = document.getElementById("vidas");

const audioPierde= new Audio ("./statics/audio/explosion.mp3");
const audioGana= new Audio ("./statics/audio/llego.mp3");
const audioPerdio= new Audio ("./statics/audio/perdiste.mp3");
const audioGano= new Audio ("./statics/audio/gano.mp3");




audioPerdio.duration= 0.5;





var gano=false;

var sprite=0; //primer sprite

var poXPrimera;
var posXSegunda;
var posXTercera;
var posXCuarta;
var x=0;
var y=0;
var dy=0;
var dx=0;
var elegido=1;
var vidas=3;
var llegoMarte=0;
var llegoNeptuno=0;
var llegoTierra=0;
var llegoSaturno=0;
var impreso=false;
class Planeta {
    constructor (x, y, r, img, tamano, nombre){
        this.x = x;
        this.y = y;
        this.r = r;
        this.img = img;
        this.tamaño = 100;
    }

    dibujar(){
        ctx.drawImage(this.img, this.x, this.y, this.r, this.r);
    }

    revisar(cohete){
        if(cohete.dx>=this.x && cohete.dx<=this.x+this.r && cohete.dy>=this.y && cohete.dy<=this.y+this.r)
        {
            cohete.dx=cohete.iniciox;
            cohete.dy=610;
            vidas-=1;
            vida.innerHTML="Vidas: "+vidas;
            audioPierde.volume=1;
            audioPierde.play();
        }
    }

}
function pausarJuego(){
    if(!pausa)
        {
            pausar.innerHTML="Seguir";
            pausa=true;
            clearInterval(contador);
        }
        else{
            pausar.innerHTML="Pausa";
            pausa=false;
            contador=setInterval(()=>{
                jugado+=1;
                tiempo.innerHTML="Tiempo: "+ jugado;
                // console.log(contando);
                contando=true;
            }, 1000);
            infos = document.querySelectorAll(".info");
            console.log(infos);
            for(info of infos){
                info.style.display="none";
            }
        }
}
function inicioNaves()
{
    cohete1.dx = 200;
    cohete1.dy= 610;
    cohete1.dibujar();
    //cohete1.reiniciar();
    cohete2.dx = 400;
    cohete2.dy = 610;
    cohete2.dibujar();
    //cohete2.reiniciar();
    cohete3.dx = 600;
    cohete3.dy = 610;
    cohete3.dibujar();
    //cohete3.reiniciar();
    cohete4.dx = 800;
    cohete4.dy = 610;
    cohete4.dibujar();
    //cohete4.reiniciar();
    elegido= cohete1;
}
//Haciendo posiciones de planetas aleatorias
function colocarPlanetas()
{
    posX=[10, 260, 520, 755];
    indice = Math.floor((Math.random()*100)%4);
    indices=[indice];
    poXPrimera= posX[indice];
    do
    {
        indice = Math.floor((Math.random()*100)%4);
        posXSegunda= posX[indice];

    }while(indices.includes(indice));
    indices.push(indice);
    do
    {
        indice = Math.floor((Math.random()*100)%4);
        posXTercera= posX[indice];

    }while(indices.includes(indice));
    indices.push(indice);
    do
    {
        indice = Math.floor((Math.random()*100)%4);
        posXCuarta= posX[indice];

    }while(indices.includes(indice));

    planeta1.x=poXPrimera;
    planeta2.x=posXSegunda;
    planeta3.x=posXTercera;
    planeta4.x=posXCuarta;


    mensaje.innerText="Lleva esta navecita hacia "+exoplanetasDestino[0].pl_name;
    console.log(exoplanetasDestino[0]);
}

function fondoJuegoAnimacion()
{
    fondoJuego();
    cohete1.dibujar();
    cohete2.dibujar();
    cohete3.dibujar();
    cohete4.dibujar();
}

const fondo = new Image();

const planeta1 = new Planeta(0, 0, 100, fondo, 60);
const planeta2 = new Planeta(0, 0, 100, fondo,60);
const planeta3 = new Planeta(0, 0, 100, fondo,60);
const planeta4 = new Planeta(0, 0, 100, fondo,60);

exoplanetasDestino = new Set();

fetch("../data.json").then((response)=>response.json()).then((data)=>
    {
        
        while (exoplanetasDestino.size < 5) {
            exoplanetasDestino.add(data[Math.floor(Math.random()*data.length)]);
        }
        console.log([...exoplanetasDestino]); 
        exoplanetasDestino = [...exoplanetasDestino];
        colocarPlanetas()
        planeta1.name  = exoplanetasDestino[0].pl_name;
        planeta2.name  = exoplanetasDestino[1].pl_name;
        planeta3.name  = exoplanetasDestino[2].pl_name;
        planeta4.name  = exoplanetasDestino[3].pl_name;
        fondo.src = "./statics/img/space.jpg";

        planetas = [planeta1, planeta2, planeta3, planeta4];
        imagenes = ["./statics/img/marte.png", "./statics/img/neptuno.png", "./statics/img/tierra.png", "./statics/img/saturno.png"];
        for (planeta of planetas){
            planeta.img = new Image();
            planeta.img.src = imagenes[planetas.indexOf(planeta)];
            console.log(planeta.img.src);  
            llenarInfo(exoplanetasDestino[planetas.indexOf(planeta)], document.getElementsByClassName("info")[planetas.indexOf(planeta)]);
        }
    
        // el maximo debe medir 120, despues 100, 80 y 60


         maxTam = Math.max(exoplanetasDestino[0].pl_rade, exoplanetasDestino[1].pl_rade, exoplanetasDestino[2].pl_rade, exoplanetasDestino[3].pl_rade);
        
        planeta1.tamano = 2 * (exoplanetasDestino[0].pl_rade / maxTam)| 120;
        planeta2.tamano = 2 * (exoplanetasDestino[1].pl_rade/ maxTam) | 120;
        planeta3.tamano = 2 * (exoplanetasDestino[2].pl_rade / maxTam) | 120;
        planeta4.tamano = 2 * (exoplanetasDestino[3].pl_rade/ maxTam) | 120;
        
        console.log(planeta1.tamano);
        console.log(planeta2.tamano);
        console.log(planeta3.tamano);
        console.log(planeta4.tamano);
        fondoJuego();
    }
    
);


function fondoJuego()
{
    ctx.drawImage(fondo, 0,0,1000,700);
    planeta1.dibujar();
    planeta2.dibujar();
    planeta3.dibujar();
    planeta4.dibujar();
}

///////MOVIMIENTO DE NAVES////////
class Cohetes 
{
    constructor (sx, sy, dx, dy, iniciox)
    {
        const imagen = new Image();
        imagen.src = "./statics/img/spritesNaves.png";
        this.sx=sx;
        this.sy=sy;
        this.sw= 46;
        this.sh = 71;
        this.dx = dx;
        this.dy = dy;
        this.dw=51;
        this.dh=93;
        this.iniciox=iniciox;
        this.img= imagen;
    }

    dibujar()
    {
        this.img.addEventListener("load", ()=>{
            ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh); 
        });
        ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh); 
    }  
}

function moverC(cohetito, flecha)
{
    if(flecha=="ArrowUp" && cohetito.dy>0)
    { 
        cohetito.dy-=10;
        
    }
    else if(flecha=="ArrowDown" && cohetito.dy<640)
    {
        cohetito.dy+=10;
     
    }
    else if(flecha=="ArrowLeft" &&  cohetito.dx>0)
    {
        cohetito.dx-=10;
    
    }
    else if(flecha=="ArrowRight" && cohetito.dx<950)
    {
        cohetito.dx+=10;
     
    }
    else{
        cohetito.dibujar();
    }
    cohetito.dibujar();
}
//////////////// Obstaculos////////////////////////}
class obstaculo
{
    //para el metoro se debe agregar las variables de sprites
    constructor(x, y, alto, ancho, vel, ruta){
        this.x = x;
        this.empieza=x;
        this.y = y;
        this.cortey;
        this.alto = alto;
        this.ancho = ancho;
        this.vel = vel;
        const imagen = new Image ();
        imagen.src = ruta;
        this.img = imagen;
        this.dir=1;
    }
    //metodo que establece el movimiento de las navecitas
    mover1()
    {
    let fin;
    let finAct;
        if(this.x < canvas.width && fin !==1){
            this.x += this.vel;
        }
        //si el alienigena llega al final de canvas se marca el fin
        else if(this.x + this.ancho >= canvas.width){
            fin = 1
            finAct = fin
        }
        //si se marca el fin...
        if(finAct === 1){
            //el la posición y el fin se reinician para continuar con el ciclo
            this.x=this.empieza;
            finAct=0;
        }
    } 

    //este es el tipo de movimiento que va a ir en sentido contrario
    mover2()
    {
        let fin;
        let finAct;
        // console.log(canvas.width);
            if(fin !=1 && this.x>0){
                this.x -= this.vel;
                
            }
            //si el alienigena llega al final de canvas se marca el fin
            else if(this.x<= 10)
            {
                fin = 1
                finAct = fin
            }
            //si se marca el fin...
            if(finAct === 1)
            {
                //el la posición y el fin se reinician para continuar con el ciclo
                this.x =990;
                finAct=0;   
            }
        } 

    dibujar ()
    {
        ctx.drawImage(this.img, this.x, this.y, this.alto, this.ancho)
    }

    dibujarSprite()
    {
        let cortey=0;
        ctx.drawImage(this.img, 0, cortey, 200, 100, this.x, this.y, this.alto, this.ancho)
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        if(cortey<200)
            cortey+=100;
        else
            cortey=0;
    }

    revisar(cohete, resta=0, suma=0, abajo=0, largo=0)
    {
        // ctx.strokeStyle="#ffffff";
        // // ctx.strokeRect(this.x+suma, this.y+abajo, this.ancho-resta, this.alto-largo);
        // // ctx.strokeRect(cohete.dx+15, cohete.dy+17, cohete.dw-25, cohete.dh-20);
        // // ctx.strokeRect((cohete.dx+15)+cohete.dw/4-2, cohete.dy+2, 2, 2);
        // ctx.strokeRect(cohete.dx+6, (cohete.dy+cohete.dh/2)+5, 0.2, 0.2);
        // ctx.strokeRect(cohete.dx+cohete.dw-6, (cohete.dy+cohete.dh/2)+5, 0.2, 0.2);
        
        if((cohete.dx+6>=this.x+suma && cohete.dx+6 <= this.x+suma+this.ancho-resta && (cohete.dy+cohete.dh/2)+5<this.y+abajo+this.alto-largo && (cohete.dy+cohete.dh/2)+5>this.y))
        {
            cohete.dx=cohete.iniciox;
            cohete.dy=610;
            vidas-=1;
            vida.innerHTML="Vidas: "+vidas;
            audioPierde.volume=1;
            audioPierde.play();  
        }
        if(cohete.dx+cohete.dw-6>=this.x+suma && cohete.dx+cohete.dw-6 <= this.x+suma+this.ancho-resta && (cohete.dy+cohete.dh/2)+5<this.y+abajo+this.alto-largo && (cohete.dy+cohete.dh/2)+5>this.y)
        {
            cohete.dx=cohete.iniciox;
            cohete.dy=610;
            vidas-=1;
            vida.innerHTML="Vidas: "+vidas;
            audioPierde.volume=1;
            audioPierde.play();  

        }
        if((cohete.dx+15)+cohete.dw/4-2>=this.x+suma && (cohete.dx+15)+cohete.dw/4-2 <= this.x+suma+this.ancho-resta && cohete.dy+2<this.y+abajo+this.alto-largo && cohete.dy+2>this.y)
        {
            cohete.dx=cohete.iniciox;
            cohete.dy=610;
            vidas-=1;
            vida.innerHTML="Vidas: "+vidas;
            audioPierde.volume=1;
            audioPierde.play();

        }
        if(((this.x+suma+this.ancho-resta > cohete.dx+15 && this.x+suma +this.ancho-resta <cohete.dx+15+cohete.dw-25) || (this.x+suma>cohete.dx+15 && this.x+suma<cohete.dx+15+cohete.dw-25) ) && ((this.y+abajo+this.alto-largo > cohete.dy+17 && this.y+abajo+this.alto-largo<cohete.dy+17+cohete.dh-20)||(this.y+abajo<cohete.dy+17+cohete.dh-20 && this.y+abajo> cohete.dy+17)))
        {
            cohete.dx=cohete.iniciox;
            cohete.dy=610;
            vidas-=1;
            vida.innerHTML="Vidas: "+vidas;
            audioPierde.volume=1;
            audioPierde.play();
        }
    }
}

//se crean los objetos
const alien1 = new obstaculo(0,300, 50,50, 2,  "./statics/img/alien.png"); 
const meteoro1 = new obstaculo(0,500, 70,60, 2, "./statics/img/meteoro.png"); 
const ovni1 = new obstaculo(0,400, 55,65, 1,  "./statics/img/ovni.png"); 
const ovni2 = new obstaculo(0,120, 55,65, 3, "./statics/img/ovni.png");
const meteoro2 = new obstaculo(990,200, 70,60, 4, "./statics/img/meteoro.png");
meteoro2.dir=2;

////////////Objetos de atrás
const alien1_2 = new obstaculo(-600,300, 50,50, 2,  "./statics/img/alien.png"); 
const meteoro1_2 = new obstaculo(-600,500, 70,60, 2, "./statics/img/meteoro.png"); 
const ovni1_2 = new obstaculo(-300,400, 55,65, 1,  "./statics/img/ovni.png"); 
const ovni1_3 = new obstaculo(-900,400, 55,65, 1,  "./statics/img/ovni.png"); 
const ovni2_2 = new obstaculo(-600,120, 55,65, 3, "./statics/img/ovni.png");
const meteoro2_2 = new obstaculo(1600,200, 70,60, 4, "./statics/img/meteoro.png");

/////////DIBUJAR Y SELECCIONAR LAS NAVES////////////
const cohete1 = new Cohetes(0, 0, 200, 610, 200);
cohete1.dibujar();
const cohete2 = new Cohetes(0, 71, 400, 610, 400);
cohete2.dibujar();
const cohete3 = new Cohetes(0, 143, 600, 610, 600);
cohete3.dibujar();
const cohete4 = new Cohetes(0, 216, 800, 610, 800);
cohete4.dibujar();

planeta1.dibujar();
planeta2.dibujar();
planeta3.dibujar();
planeta4.dibujar();

inicioNaves();


document.addEventListener("keydown", (evento)=>{
    if(vidas>0 && !pausa)
    {
        ctx.drawImage(fondo, 0,0,1000,700);
        planeta1.dibujar();
        planeta2.dibujar();
        planeta3.dibujar();
        planeta4.dibujar();

        if(elegido!=cohete1)
        {
            cohete1.dibujar();
        }
        if(elegido!=cohete2)
        {
            cohete2.dibujar();
        }
        if(elegido!=cohete3)
        {
            cohete3.dibujar(); 
        }
        if(elegido!=cohete4)
        {
            cohete4.dibujar();
        }
        if(cohete1.dx<=poXPrimera+60 && cohete1.dx>=poXPrimera && cohete1.dy<=30 && cohete1.dy>=0)
        {
            elegido=cohete2;
            mensaje.innerText="Lleva esta navecita hasta " + exoplanetasDestino[1].pl_name;
            if(llegoMarte==0)
            { 
                pausarJuego();
                mostrarInfo(1);
                audioGana.volume=0.8;
                audioGana.play();
                llegoMarte=1;
               
                
            }
            cohete1.dibujar();
        }
        if(cohete2.dx<=posXTercera+70 && cohete2.dx>=posXTercera+10 && cohete2.dy<=20 && cohete2.dy>=0)
        {   
            console.log(posXTercera);
            console.log(cohete3.dx);
            elegido=cohete3;
            mensaje.innerText="Lleva esta navecita hacia " + exoplanetasDestino[2].pl_name;
            cohete2.dibujar();
            if(llegoNeptuno==0)
            { 
                pausarJuego();
                mostrarInfo(2);
                audioGana.volume=0.8;
                audioGana.play();
                llegoNeptuno=1;  
            }
        }
        if(cohete3.dx<=posXSegunda+105 && cohete3.dx>=posXSegunda+40 && cohete3.dy<=44 && cohete3.dy>=0)
        {
            
            elegido=cohete4;
            mensaje.innerText="Lleva esta navecita hacia"+ exoplanetasDestino[3].pl_name;
            cohete3.dibujar();
            if(llegoSaturno==0)
            { 
                pausarJuego();
                mostrarInfo(3);
                audioGana.volume=0.8;
                audioGana.play();
                llegoSaturno=1;
                
            }
        }
        if(cohete4.dx<=posXCuarta+70 && cohete4.dx>=posXCuarta+10 && cohete4.dy<=40 && cohete4.dy>=0)
        {
            
            elegido=null;
            cohete4.dibujar();
            if(llegoNeptuno==0)
            { 
                pausarJuego();
                audioGana.volume=0.8;
                audioGana.play();
                llegoTierra=1;
                mostrarInfo(4);
                
            }
        }
        evento.preventDefault();
        if(elegido!=null)
        {
            //function dibujarCohete(){
                moverC(elegido, evento.key);
            //     window.requestAnimationFrame(dibujarCohete);
            // }
        }
        else{
            audioGano.duration= 4;
            audioGano.play();
            ctx.fillStyle="#ffffff";
            ctx.font="50px serif";
            ctx.fillText("Ganaste", 200, 600);
            
            mensaje.innerText="¡Felicidades!";
            elegido=cohete1;
            gano=true;
            ctx.textAlign="center";
            clearInterval(contador);
            if(document.cookie)
            {
                let cookie_record = document.cookie.split('=');
                if(cookie_record[1]>jugado)
                {
                    document.cookie="tiempo="+jugado+";max-age: 86400";
                }
            }
            else{
                document.cookie="tiempo="+jugado+";max-age: 86400";
                cookie_record = document.cookie.split('=');   
            }
            cookie_record = document.cookie.split('=');
            record.innerHTML="Record:"+cookie_record[1];    
        }
    }
});

//////////TIEMPO///////
const tiempo = document.getElementById("tiempo");
var jugado=0;
var contando = false;
var contador=setInterval(()=>{
        jugado+=1;
        tiempo.innerHTML="Tiempo: "+ jugado;
        contando=true;
    }, 1000);
    
///////REINICIAR/////
const reiniciar = document.getElementById("repetir");
reiniciar.addEventListener("click", ()=>{
    gano=false;
    elegido=cohete1;
    mensaje.innerText="";
    impreso=false;
    llegoMarte=0;
    llegoNeptuno=0;
    llegoTierra=0;
    llegoSaturno=0;
    pausa=false;
    pausar.innerHTML="Pausa";
    vidas=3;
    vida.innerHTML="Vidas: "+vidas;
    clearInterval(contador);
    jugado = 0;
    tiempo.innerHTML="Tiempo: 0";
    contador=setInterval(()=>{
        jugado+=1;
        tiempo.innerHTML="Tiempo: "+ jugado;
        // console.log(contando);
        contando=true;
    }, 1000);
    colocarPlanetas();
    fondoJuego();
    inicioNaves();
});


//OBSTACULOS//
function dibujar(){
  
    if(vidas>0 && !pausa && gano==false)
    {
        fondoJuegoAnimacion();
        cohete1.dibujar();
        alien1.dibujar()
        alien1.mover1()
        meteoro1.dibujarSprite()
        meteoro1.mover2()
        ovni1.dibujar()
        ovni1.mover1()
        ovni2.dibujar()
        ovni2.mover1()
        meteoro2.dibujarSprite()
        meteoro2.mover2()
        ovni1.revisar(elegido, 34, 10, 18, 10)
        ovni2.revisar(elegido, 34, 10, 18, 10)
        alien1.revisar(elegido)
        meteoro1.revisar(elegido, 0 ,4, 13, 20)
        meteoro2.revisar(elegido, 0, 4, 13, 20)
        

        alien1_2.dibujar()
        alien1_2.mover1()
        meteoro1_2.dibujarSprite()
        meteoro1_2.mover2()
        ovni1_2.dibujar()
        ovni1_2.mover1()
        ovni1_3.dibujar()
        ovni1_3.mover1()
        ovni2_2.dibujar()
        ovni2_2.mover1()
        meteoro2_2.dibujarSprite()
        meteoro2_2.mover2()
        ovni1_2.revisar(elegido, 34, 10, 18, 10)
        ovni2_2.revisar(elegido, 34, 10, 18, 10)
        alien1_2.revisar(elegido)
        meteoro1_2.revisar(elegido, 0 ,4, 13, 20)
        meteoro2_2.revisar(elegido, 0 ,4, 13, 20)
        ovni1_3.revisar(elegido, 34, 10, 18, 10);
        if(sprite%10==0)
        {
                if(elegido.sx<138)
            {
                elegido.sx+=46;
            }
            else
            {
                elegido.sx=0;
            }
        }
        sprite++;
        
    }
    if(vidas==0 && impreso==false)
    {
        ctx.fillStyle="#ffffff";
        ctx.font="50px serif";
        ctx.fillText("Perdiste", 200, 600);
        mensaje.innerText="Seguramente a la próxima :)";
        audioPerdio.play();
        ctx.textAlign="center";
        clearInterval(contador);
        impreso=true;
    }
   
        window.requestAnimationFrame(dibujar);
       
    
}

///////////PAUSA////////
const pausar = document.getElementById("pausa");
var pausa = false;
pausar.addEventListener("click", (evento)=>pausarJuego());



function llenarInfo(exoplaneta, info){
    
    info.innerHTML = "¡Genial! LLegaste a ";
    if(exoplaneta.pl_name != null) {
        info.innerHTML += "<h1>" + exoplaneta.pl_name +"</h1>";
    }

    if(exoplaneta.pl_rade != null) {
        info.innerHTML += `<p>Radio: ${exoplaneta.pl_rade} radios terrestres</p>`;
    }
    if(exoplaneta.pl_masse != null) {
        info.innerHTML += `<p>Masa: ${exoplaneta.pl_masse} masas terrestres </p>`;
    }

    if(exoplaneta.sy_dist != null) {
        info.innerHTML += `<p>Distancia del sistema solar: ${exoplaneta.sy_dist} años luz</p>`;
    }

    if(exoplaneta.disc_year != null) {
        info.innerHTML += `<p>Descubierto en: ${exoplaneta.disc_year}</p>`;
    }

    const tache = document.createElement("div");
    tache.textContent = "X";
    tache.classList.add("tache");
    tache.id = `tache`+ info.id;
    tache.addEventListener("click", ocultarInfoPlaneta);
    info.appendChild(tache);

}

function ocultarInfoPlaneta(e) {
    console.log("click");
    let id = e.target.id;
    console.log(id);
    let i = id.substring(5);
    console.log(i);
    let info = document.getElementById(i);
    info.style.display = "none";
    pausarJuego();

}

function mostrarInfo(i) {
    let info = document.getElementById(`info`+ i);
    console.log(info)
    info.style.display = "flex";
}


window.requestAnimationFrame(dibujar);
