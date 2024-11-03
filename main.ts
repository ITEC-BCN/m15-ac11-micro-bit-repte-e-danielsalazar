//  Variable de estado para controlar el modo actual
let modo_a = true
//  Comenzamos en el modo de temperatura (botón A)
//  Limpiar los LEDs al cambiar al modo A
input.onButtonPressed(Button.A, function on_button_a_pressed() {
    
    modo_a = true
    //  Cambiamos al modo de temperatura
    basic.clearScreen()
})
//  Limpiar los LEDs al cambiar al modo B
input.onButtonPressed(Button.B, function on_button_b_pressed() {
    
    modo_a = false
    //  Cambiamos al modo de aceleración
    basic.clearScreen()
})
//  Bucle principal
function main_loop() {
    
    let temperature = 0
    let accX = 0
    let accY = 0
    let Y = 2
    let X = 2
    while (true) {
        if (modo_a) {
            //  Modo A: Muestra la temperatura en un gráfico de barras
            temperature = input.temperature()
            led.plotBarGraph(temperature, 50)
            //  Dibuja un gráfico de barras de la temperatura
            basic.pause(50)
        } else {
            //  Modo B: Controla el movimiento con el acelerómetro
            led.plot(X, Y)
            basic.pause(50)
            led.unplot(X, Y)
            accX = input.acceleration(Dimension.X)
            accY = input.acceleration(Dimension.Y)
            //  Ajustar los rangos de aceleración para que se mueva solo si la inclinación es significativa
            if (accX < -200 && X > 0) {
                //  Inclinado hacia la izquierda
                X -= 1
            } else if (accX > 200 && X < 4) {
                //  Inclinado hacia la derecha
                X += 1
            }
            
            if (accY < -200 && Y > 0) {
                //  Inclinado hacia arriba
                Y -= 1
            } else if (accY > 200 && Y < 4) {
                //  Inclinado hacia abajo
                Y += 1
            }
            
        }
        
    }
}

//  Ejecuta el bucle principal
main_loop()
