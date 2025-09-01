# Main Cavas 

The following document explains the code found in **/src/components/canvasParts/Canvas.tsx**. Note that this documentation was written in August/September 2025 and the codebase is heavily subject to change. It is recommended to follow this documentation with the August 2025 version of the the codebase (found in the Github repository).

## Input Properties
- **MAX_RANGE**: the maximum range we want the cannon to be able to shoot (assuming the projectile finishes at the same altitude that it started)
- **MAX_HEIGHT**: the maximum height we want the cannon to be able to shoot
- **target_range**: how far away the the target is from the cannon
- **target_altidue**: how high above the ground the target is
- **userStateRef**: the reference to the user's current state (more information in UserStateRef.md)
- **gameStateRef**: the reference to the game's current state (more information in GameStateRef.md)
- **setStateChangeTrigger**: the function that triggers a state change (introduced in Level.md)
- **disableInput**: an object that describes which parameters of the cannon (launch angle, launch speed, height) are fixed
- **objectsToDraw**: a list of images to draw onto the canvas

## Functionality

### Set Up

Initially, we begin by defining some key constants, state variables and references.

- **CANNON_HORIZONTAL_SCALAR**: set to a value $0 < c < 1$ which, given a window screen $w$, will position the cannon's launch point at an x-coordinate of $w c$. By experiemntation, for a landscape view, $c = 0.5$ and for a portrait view, $c = 0.8$.

- **USER_ANCHOR_POINT**: a number array of size 2. At index 0, we store CANNON_HORIZONTAL_SCALAR. At index 1, we store the value $y$ such that given a window height $h$, the y-coordinate of the cannon's launch point is $hy$. Note that this value is stored in **gameStateRef.current[2]**.

- **width** and **height**: Uses a defined hook to determine the current window width and height - dynamically changes as the window is resized.

- **canvasRef**: To be used to refer to the canvas element in this component

- **angleInputRef**, **velocityInputRef** and **heightInputRef**: To be usd to refer to the input (text)boxes used to take in user-given values for the corresponding cannon parameters.

- **MAX_SPEED**: maximum launch spedd of the cannon is calculated based on the desired range. 

Below is the mathematical derivation for the calculation of MAX_SPEED: 

Recall that for no air resistance, maximum range is achieved at a launch angle of 45 degrees. Therefore, the horizontal and vertical velocity components have equal magnitude. That is $u_x = u_y$. We also assume that this maximum range occurs when the projectile returns to its original altitude. That is $s_y = 0$. 

For no air resistance we have
$$s_x = u_x t \implies t = \frac{s_x}{u_x}$$

where $s_x$ denotes the horizontal range achieved.

$$s_y = u_y t + \frac{1}{2} a_y t^2.$$

Taking up as the positive direction we get
$$s_y = u_y \times \frac{s_x}{u_x} - \frac{1}{2} \times 9.8 \times (\frac{s_x}{u_x})^2.$$

Since $u_x = u_y$ and $s_y = 0$ we get

$$0 = s_x - \frac{1}{2} \times 9.8 \times (\frac{s_x}{u_x})^2.$$

From there we solve for $u_x^2$

$$\frac{1}{2} \times 9.8 \times (\frac{s_x}{u_x})^2 = s_x$$
$$\frac{s_x^2}{u_x^2} = \frac{2 \times s_x}{9.8}$$

$$u_x^2 = \frac{9.8s_x^2}{2s_x} = \frac{9.8}{2}s_x$$

To solve for the magnitude of initial velocity $u$ we solve 

$$ u = \sqrt{u_x^2 + u_y^2} $$
$$ u = \sqrt{u_x^2 + u_x^2} $$
$$ u = \sqrt{2 u_x^2} $$
$$ u = \sqrt{2 \times \frac{9.8}{2}s_x } $$
$$ u = \sqrt{9.8s_x } $$

as used in the code.

- **foregroundInfo**, **cannonInfo**, **holsterInfo**, **getVelocitySliderInfo**, **getHeightBarInfo** and **getTargetInfo**: uses the src/Cannon.json file to return information about each image - useful for determining which object a user is clicking on.

- **elevationAngle** and **launchVelocity**: state variables to keep track of the desired launch angle and velocity for the cannon

- **click_x** and **click_y**: references to integers: keeps track of where the user is clicking.

- **clickedBehindPivot**: reference to boolean value that TRUE if a user clicks behind the pivot of the cannon and FALSE if the user clicks in front of the pivot.


- **positionAndSizesInterfaceRef** and **drawingInterfaceRef** are references to instances of the *CanvasPositionAndSizes* class and *DrawingImages* respectively - their purposes are explored in separate documentation.

- **cavnasMouseDownEvent** and **canvasMouseMoveEvent** are references to instances of the *CanvasMouseDown* and *CanvasMouseMove* classes respectively - their purposes are explored in separate documentation.

- **imagePreloader**: instance of the *CanvasImagePreloader* class - its purpose is explored in separate documentation

### UseEffects

- **Adjust Pivot Point**: listens to when the window's width and height changes and adjusts position of the cannon as a result.

- **Game State Ref Height Update**: listens for when USER_ANCHOR_POINT changes (due to user input changing the launch height) and updating the gameStateRef accordingly.

- **Restarting listener**: if the user requests for a level restart, all inputs and set back to default, and userState is set back to Idle (the default state)

- **CanvasLoading**: in the intial stage of beginning a level, assets (images) need to be loaded in. Notice the use of the **imagePreloader**.

- **Height Check**: determines the new user anchor point based on user input changing the launch height of the cannon. Based on the input height (in metres), the correspoding pixel height is calculated using the conversion rate (see *ConversionRate.md*), and the perctange of this pixel height compared to the canvas height is calculated. Using this, we can calculate the percentage of the canvas' height that must be traversed down to draw the cannon in at the new input height.

- **fix dpi**: very specific to handling an HTML canvas. Seperate documentation will be written.

- **Initialise Class Instance**: initialises the class intances - each will have their own documentation to explore their purpose.

- **Refreshing Canvas On Input**: when a user provides input for launch angle, velocity or height (user achor point), the game state needs to be updated and the stateChange trigger is fired to redraw everything.

- **Drawing Environment**: draws the evionnment.

### Mouse Event Listeners
- **mouseDown**: listens for mouse down events and determines which if any of the canvas objects the user is clicking

- **mouseMove**: when the user moves their mouse on the canvas, determines how a canvas object should move (assuming the user previously clicked on it).

- **mouseUp**: when a user raises their mouse off the canvas, it must be that their state is idle again.

## Returns
The returned element is of the following structure
- Container Div - capable of scrolling
    - Canvas - where objects get drawn
    - Input panel - where user can punch in numbers to change cannon variables
    - Interactive map - displays where the user is located
    - Fire button - the button that triggers the cannon to fire