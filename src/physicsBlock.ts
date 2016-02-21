/// <reference path="block.ts" />
/// <reference path="point.ts" />
/// <reference path="IRenderable.ts" />

class PhysicsBlock extends Block {
	
	private internalGravity: number;
	private onBounceCallback: () => void;
	private worldWidth: number;
	
	public get gravity(): number {
		return this.internalGravity;
	}
	public set gravity(newValue: number) {
		this.internalGravity = newValue;
	}
	
	get onBounce() : () => void {
		return this.onBounceCallback;
	}
	set onBounce(newValue: () => void) {
		this.onBounceCallback = newValue;
	}

	public constructor(
		worldPosition: MovingPoint,
		dimensions: Point,
		color: string,
		gravity: number,
		worldWidth?: number)
	{
		super(worldPosition, dimensions, color);
		
		this.internalGravity = gravity;
		this.worldWidth = worldWidth;
	}
	
	public Tick(){
		super.Tick();
		
		// If off the right, bounce left
		if(this.right > this.worldWidth)
		{
			// Clamp on screen, invert horizontal speed
			this.xPosition = this.worldWidth - this.width;
			this.xSpeed = -Math.abs(this.xSpeed);
		}
		
		// If off the left, bounce right
		if(this.left < 0)
		{
			// Clamp on screen, invert horizontal speed
			this.xPosition = 0;
			this.xSpeed = Math.abs(this.xSpeed); 
		}
		
		// Apply acceleration due to gravity
		this.ySpeed += this.internalGravity;
	}
	
	public Render(renderContext: CanvasRenderingContext2D): IRenderable[] {
		return super.Render(renderContext);
	}
	
	public VerticalBounce(newYSpeed: number) {
		this.ySpeed = newYSpeed;
		
		// Allow insertion of bouncing code
		if(this.onBounceCallback)
		{
			this.onBounceCallback();
		}
	}
}