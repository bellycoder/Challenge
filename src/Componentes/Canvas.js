import React, { Component } from 'react'
import './Canvas.css'

export default class Canvas extends Component {
    render() {
        window.onload = function() {
            let canvas = document.getElementById("canvas1");
            let contenedor = document.getElementById("Contenedor");
            let cuadritos = [];
            let sizeCuadro = { ancho: 15, alto: 15 };
            let color = "#FFFFFF";
            let estado = false;
            
            if (canvas && canvas.getContext) {
              let ctx = canvas.getContext("2d");
              if (ctx) {
                function dibujaGrid(disX, disY, anchoLinea, color) {
                  ctx.strokeStyle = color;
                  ctx.lineWidth = anchoLinea;
                  let columnas = [];
                  let filas = [];
                  for (let i = disX; i < canvas.width; i += disX) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                    ctx.stroke();
                    columnas.push(i);
                  }
                  for (let i = disY; i < canvas.height; i += disY) {
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(ctx.canvas.width, i);
                    ctx.stroke();
                    filas.push(i);
                  }
                  columnas.push(0);
                  filas.push(0);
                  for (let x = 0; x < columnas.length; x++) {
                    for (let y = 0; y < filas.length; y++) {
                      cuadritos.push([columnas[x], filas[y], disX, disY]);
                    }
                  }
                }
          
                function fillCell(x, y) {
                  ctx.fillStyle = color;
                  for (let i = 0; i < cuadritos.length; i++) {
                    let cuadro = cuadritos[i];
                    if (
                      x > cuadro[0] &&
                      x < cuadro[0] + cuadro[2] &&
                      y > cuadro[1] &&
                      y < cuadro[1] + cuadro[3]
                    ) {
                      ctx.fillRect(
                        cuadro[0],
                        cuadro[1],
                        sizeCuadro.ancho,
                        sizeCuadro.alto
                      );
                      break;
                    }
                  }
                  dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto);
                }
          
                canvas.onmousemove = function(e) {
                  if (estado) {
                    let canvaspos = canvas.getBoundingClientRect();
                    fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
                  }
                };
          
                canvas.onclick = function(e) {
                  let canvaspos = canvas.getBoundingClientRect();
                  fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
                };
          
                canvas.onmousedown = function() {
                  estado = true;
                };
          
                canvas.onmouseup = function() {
                  estado = false;
                };
          
                canvas.width = contenedor.offsetWidth - 400;
                dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");
              }
            }

           /* switch(current){
              case (current == true && (vecino1 || vecino2 || vecino3)):
                
            }*/
          };
          
        return (
            <div id="Contenedor">
                <h1><p>Juego de la vida</p></h1>
                <div id="contenedorCanvas">
                    <canvas id="canvas1" width="600" height="820">
                    </canvas>
                </div>
            </div>
        )
    }
}
