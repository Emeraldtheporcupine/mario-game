namespace SpriteKind {
    export const Tube = SpriteKind.create()
    export const Block = SpriteKind.create()
    export const Forterss = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (Jumping < 1 && ((controller.right.isPressed() && controller.left.isPressed()) == false && Look_R > 0)) {
        Jumping = 0
        Mario.setImage(assets.image`Mario`)
    } else if (Jumping < 1 && ((controller.right.isPressed() && controller.left.isPressed()) == false && Look_L > 0)) {
        Jumping = 0
        Mario.setImage(assets.image`Mario L`)
    } else if (false) {
    	
    } else if (false) {
    	
    }
})
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
    Jumping = 1
    if (Mario.vy == 0) {
        Mario.vy = -100
    }
    if (Look_R > 0) {
        animation.runImageAnimation(
        Mario,
        assets.animation`Mario Jump`,
        200,
        false
        )
    } else {
        animation.runImageAnimation(
        Mario,
        assets.animation`Mario Jump L`,
        200,
        false
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    Die()
})
function Start () {
    Jumping = 0
    info.setScore(0)
    Dead = 0
    music.stopAllSounds()
    tiles.setCurrentTilemap(tilemap`level2`)
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        _Block = sprites.create(assets.image`Q-Block`, SpriteKind.Block)
        tiles.placeOnTile(_Block, value)
        tiles.setTileAt(value, assets.tile`myTile5`)
    }
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
    Castle = sprites.create(assets.image`Castle`, SpriteKind.Forterss)
    tiles.placeOnTile(Castle, tiles.getTileLocation(158, 13))
    Mario = sprites.create(assets.image`Mario`, SpriteKind.Player)
    scene.cameraFollowSprite(Mario)
    controller.moveSprite(Mario, 75, 0)
    Mario.ay = 200
    tiles.placeOnTile(Mario, tiles.getTileLocation(0, 14))
    music.play(music.createSong(assets.song`Theme`), music.PlaybackMode.LoopingInBackground)
    animation.runImageAnimation(
    _Block,
    assets.animation`Q-Block Shine`,
    100,
    true
    )
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_R = 0
    Look_L = 1
    animation.runImageAnimation(
    Mario,
    assets.animation`Mario Walk L`,
    200,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Look_R = 1
    Look_L = 0
    animation.runImageAnimation(
    Mario,
    assets.animation`Mario Walk`,
    200,
    true
    )
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
let Castle: Sprite = null
let coins: Sprite = null
let Tube: Sprite = null
let _Block: Sprite = null
let Dead = 0
let Mario: Sprite = null
let Jumping = 0
let Look_L = 0
let Look_R = 0
Look_R = 1
Look_L = 0
Start()
