let wall_pos_y = 0
let wall_pos_x = 0
let player_pos_y = 0
let beta = false
let beta2 = false
let game_run = true
let something = true
let player_pos_x = 1
let x = 0
let y = 0
let points = 0
let best_points = storage.getNumber(StorageSlots.s7)
basic.setLedColor(basic.rgb(0, 255, 0))
basic.forever(function on_forever() {
    
    input.onButtonEvent(Button.B, 0, function on_button_event_b() {
        
        beta2 = true
    })
    input.onButtonEvent(Button.A, input.buttonEventClick(), function on_button_event_a() {
        
        beta = true
    })
    function dead() {
        
        draw_display()
        game_run = false
        basic.setLedColor(basic.rgb(255, 0, 0))
        for (let i = 0; i < 4; i++) {
            led.enable(true)
            basic.pause(150)
            led.enable(false)
            basic.pause(150)
        }
        led.enable(true)
        basic.showString("GAMEOVER P.:" + points, 50)
        if (best_points < points) {
            basic.setLedColor(basic.rgb(0, 0, 255))
            best_points = points
            storage.putNumber(StorageSlots.s7, best_points)
            console.log(best_points)
            basic.showString("RECORD:" + best_points, 50)
        }
        
        player_pos_y = 0
        wall_pos_x = 6
        points = 0
        game_run = true
        basic.clearScreen()
    }
    
    if (game_run) {
        basic.setLedColor(basic.rgb(0, 255, 0))
        if (player_pos_y == 6 || player_pos_y == -1) {
            dead()
        } else if (beta2) {
            beta2 = false
        } else if (beta) {
            beta = false
            player_pos_y += 0 - 1
        } else {
            player_pos_y += 1
        }
        
        if (wall_pos_x == 0) {
            wall_pos_y = randint(0, 3)
            wall_pos_x = 6
        } else {
            wall_pos_x += 0 - 1
        }
        
        if (player_pos_y > wall_pos_y && 1 == wall_pos_x || player_pos_y < wall_pos_y && 1 == wall_pos_x) {
            dead()
        }
        
        if (player_pos_y == wall_pos_y && 1 == wall_pos_x) {
            points += 1
            basic.setLedColor(basic.rgb(255, 255, 0))
        }
        
    }
    
    // schow evrything
    function draw_display() {
        basic.clearScreen()
        led.plotBrightness(wall_pos_x, wall_pos_y - 4, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y - 3, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y - 2, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y - 1, 150)
        // led.plot_brightness(wall_pos_x, wall_pos_y, 255)
        led.plotBrightness(wall_pos_x, wall_pos_y + 1, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y + 2, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y + 3, 150)
        led.plotBrightness(wall_pos_x, wall_pos_y + 4, 150)
        led.plot(player_pos_x, player_pos_y)
    }
    
    draw_display()
    basic.pause(1000)
})
