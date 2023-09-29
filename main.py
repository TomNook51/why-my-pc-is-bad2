wall_pos_y = 0
wall_pos_x = 0
player_pos_y = 0
beta = False
beta2= False
game_run=True
something=True
player_pos_x = 1
x=0
y=0
points=0
best_points=storage.get_number(StorageSlots.S7)

basic.set_led_color(basic.rgb(0, 255, 0))
def on_forever():
    global player_pos_y, beta,beta2, wall_pos_y, wall_pos_x,something,x,y,points,best_points
    
    def on_button_event_a():
        global beta
        beta = True
    def on_button_event_b():
        global beta2
        beta2=True
    input.on_button_event(Button.B, 0, on_button_event_b)
    input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)



    def dead():
        global x,y,something,game_run,player_pos_y,wall_pos_x,points,best_points
        draw_display()
        game_run=False
        basic.set_led_color(basic.rgb(255, 0, 0))
        
        for i in range(4):
            led.enable(True)
            basic.pause(150)
            led.enable(False)
            basic.pause(150)

        led.enable(True)
        basic.show_string("GAMEOVER P.:"+points,50)
        if best_points<points:
            basic.set_led_color(basic.rgb(0,0,255))
            best_points=points
            storage.put_number(StorageSlots.S7, best_points)
            print(best_points)
            basic.show_string("RECORD:"+best_points,50)
        player_pos_y = 0
        wall_pos_x=6
        points=0
        game_run=True
        basic.clear_screen()
        



    if game_run:
        basic.set_led_color(basic.rgb(0, 255, 0))
        if player_pos_y == 6 or player_pos_y == -1:
            dead()
        elif beta2:
            beta2=False
        elif beta:
            beta = False
            player_pos_y += 0 - 1
        else:
            player_pos_y += 1
        if wall_pos_x == 0:
            wall_pos_y = randint(0, 3)
            wall_pos_x = 6
        else:
            wall_pos_x += 0 - 1
        
        if (player_pos_y>wall_pos_y and 1==wall_pos_x) or (player_pos_y<wall_pos_y and 1==wall_pos_x):
            dead()
        
        if player_pos_y==wall_pos_y and 1==wall_pos_x:
            points+=1
            basic.set_led_color(basic.rgb(255, 255, 0))


    
    
    #schow evrything
    def draw_display():
        basic.clear_screen()
        led.plot_brightness(wall_pos_x, wall_pos_y-4, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y-3, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y-2, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y-1, 150)
        #led.plot_brightness(wall_pos_x, wall_pos_y, 255)
        led.plot_brightness(wall_pos_x, wall_pos_y+1, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y+2, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y+3, 150)
        led.plot_brightness(wall_pos_x, wall_pos_y+4, 150)
        led.plot(player_pos_x, player_pos_y)
    draw_display()
        
    
    
    basic.pause(1000)

basic.forever(on_forever)
