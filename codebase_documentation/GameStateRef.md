# Game State Ref

The game state ref is a reference to a array of type *GameState* (see /src/types/gameState.tsx).The type *GameState* is described as follows:

GameState stores the critical information regarding the cannon variables and level. It is purely relevant while playing a level. The attributes are as follows:
- angle: the launch angle that the cannon is currently set to
- veloctity: the launch speed that hte cannon is currently set to
- yPosScalar: the ratio between the y-coordinate of the cannon pivot point and the total canvas height (changes as the user changes the cannon's launch height)
- xScroll: a value between 0 and 1 that determines how far to the left or right a user has scrolled along the canvas