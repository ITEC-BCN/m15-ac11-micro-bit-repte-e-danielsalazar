# Variable de estado para controlar el modo actual
modo_a = True  # Comenzamos en el modo de temperatura (botón A)

def on_button_a_pressed():
    global modo_a
    modo_a = True  # Cambiamos al modo de temperatura
    basic.clear_screen()  # Limpiar los LEDs al cambiar al modo A

input.on_button_pressed(Button.A, on_button_a_pressed)

def on_button_b_pressed():
    global modo_a
    modo_a = False  # Cambiamos al modo de aceleración
    basic.clear_screen()  # Limpiar los LEDs al cambiar al modo B

input.on_button_pressed(Button.B, on_button_b_pressed)

# Bucle principal
def main_loop():
    global modo_a
    temperature = 0
    accX = 0
    accY = 0
    Y = 2
    X = 2
    
    while True:
        if modo_a:
            # Modo A: Muestra la temperatura en un gráfico de barras
            temperature = input.temperature()
            led.plot_bar_graph(temperature, 50)  # Dibuja un gráfico de barras de la temperatura
            basic.pause(50)
        else:
            # Modo B: Controla el movimiento con el acelerómetro
            led.plot(X, Y)
            basic.pause(50)
            led.unplot(X, Y)
            accX = input.acceleration(Dimension.X)
            accY = input.acceleration(Dimension.Y)

            # Ajustar los rangos de aceleración para que se mueva solo si la inclinación es significativa
            if accX < -200 and X > 0:  # Inclinado hacia la izquierda
                X -= 1
            elif accX > 200 and X < 4:  # Inclinado hacia la derecha
                X += 1
  
            if accY < -200 and Y > 0:  # Inclinado hacia arriba
                Y -= 1
            elif accY > 200 and Y < 4:  # Inclinado hacia abajo
                Y += 1

# Ejecuta el bucle principal
main_loop()
