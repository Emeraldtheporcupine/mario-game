namespace SpriteKind {
    export const Tube = SpriteKind.create()
}
function Die () {
    if (Dead < 1) {
        Dead += 1
        animation.runImageAnimation(
        Mario,
        assets.animation`Mario Dead`,
        200,
        false
        )
        for (let index = 0; index < 50; index++) {
            Mario.y += 1
        }
        for (let index = 0; index < 50; index++) {
            Mario.y += -1
        }
        sprites.destroy(Mario, effects.none, 0)
        Start()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tube, function (sprite, otherSprite) {
    if (Mario.tilemapLocation() == tiles.getTileLocation(67, 11) && controller.down.isPressed()) {
        NextLevel()
    } else {
    	
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Mario.vy == 0) {
        Mario.vy = -100
    }
    animation.runImageAnimation(
    Mario,
    assets.animation`Mario Jump`,
    200,
    false
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    Die()
})
function Start () {
    Dead = 0
    music.stopAllSounds()
    tiles.setCurrentTilemap(tilemap`level2`)
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        Tube = sprites.create(img`
            . 1 1 1 f f f f f f f f 7 7 7 . 
            1 1 1 7 7 7 7 7 7 7 7 7 7 7 7 6 
            1 1 7 7 7 7 7 7 7 7 7 7 7 7 7 6 
            1 7 7 7 7 7 7 7 7 7 7 7 7 7 6 6 
            . 1 7 7 7 7 7 7 7 7 7 7 7 6 6 . 
            . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            . . . 1 1 7 7 7 7 7 7 6 6 . . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            . . . 1 1 7 7 7 7 7 7 6 6 . . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            . . . 1 1 7 7 7 7 7 7 6 6 . . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            . . . 1 1 7 7 7 7 7 7 6 6 . . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            . . . 1 1 7 7 7 7 7 7 6 6 . . . 
            . . . 1 7 1 7 7 7 7 6 7 6 . . . 
            `, SpriteKind.Tube)
        tiles.placeOnTile(Tube, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        coins = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runImageAnimation(
        coins,
        assets.animation`coin`,
        75,
        true
        )
    }
    Mario = sprites.create(assets.image`Mario`, SpriteKind.Player)
    scene.cameraFollowSprite(Mario)
    controller.moveSprite(Mario, 75, 0)
    Mario.ay = 200
    tiles.placeOnTile(Mario, tiles.getTileLocation(0, 14))
    music.play(music.createSong(assets.song`Theme`), music.PlaybackMode.LoopingInBackground)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_R = 0
    Look_L = 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_R = 1
    Look_L = 0
})
function NextLevel () {
    tiles.setCurrentTilemap(tilemap`level4`)
    tiles.placeOnTile(Mario, tiles.getTileLocation(0, 14))
    scene.cameraFollowSprite(Mario)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.none, 0)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
let coins: Sprite = null
let Tube: Sprite = null
let Mario: Sprite = null
let Dead = 0
let Look_L = 0
let Look_R = 0
Look_R = 1
Look_L = 0
Start()
