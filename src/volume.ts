/// <reference path="IRenderable.ts" />
/// <reference path="controller.ts" />
/// <reference path="sound.ts" />

class Volume implements IRenderable {
	private static opacityDecay: number =  0.02;
	private static fadedOpacity: number = 0.4;
	private soundButtonPosition: Point;
	private soundButtonDimensions: Point;
	private controller: Controller;
	private level: number;
	private volume0: Sprite;
	private volume1: Sprite;
	private volume2: Sprite;
	private volume3: Sprite;
	private volume4: Sprite;
	private opacity: number;
	private sounds: Sound[]

	public constructor(renderDimensions: Point, controller: Controller)
	{
		this.controller = controller;
		
		this.soundButtonPosition = {
			x: renderDimensions.x - 40,
			y: 10
		};
		
		this.soundButtonDimensions = {
			x: 30,
			y: 30
		};
		
		this.opacity = Volume.fadedOpacity;
		this.level = 2;
		
		this.volume0 = new Sprite("img/volume0.png", this.soundButtonDimensions);
		this.volume1 = new Sprite("img/volume1.png", this.soundButtonDimensions);
		this.volume2 = new Sprite("img/volume2.png", this.soundButtonDimensions);
		this.volume3 = new Sprite("img/volume3.png", this.soundButtonDimensions);
		this.volume4 = new Sprite("img/volume4.png", this.soundButtonDimensions);
		
		this.sounds = [];
	}

	public isAlive = true;
	
	private isPointOnButton(point: Point): boolean
	{
		return point
			&& point.x > this.soundButtonPosition.x
			&& point.x < this.soundButtonPosition.x + this.soundButtonDimensions.x
			&& point.y > this.soundButtonPosition.y
			&& point.y < this.soundButtonPosition.y + this.soundButtonDimensions.y
	}
	
	public Render(renderContext: CanvasRenderingContext2D): IRenderable[]
	{
		let mouseClick = this.controller.getClickPosition();
		if(mouseClick && this.isPointOnButton(mouseClick))
		{
			this.changeVolume();
		}
		
		if(this.isPointOnButton(this.controller.getMousePosition()))
		{
			this.opacity = 1;
		}
		
		this.opacity = Math.max(this.opacity - Volume.opacityDecay, Volume.fadedOpacity)

		renderContext.save();
		
		renderContext.globalAlpha = this.opacity;
		
		renderContext.translate(this.soundButtonPosition.x, this.soundButtonPosition.y);
		
		switch(this.level)
		{
			case 0:
				this.volume0.Render(renderContext);
				break;
			case 1:
				this.volume1.Render(renderContext);
				break;
			case 2:
				this.volume2.Render(renderContext);
				break;
			case 3:
				this.volume3.Render(renderContext);
				break;
			case 4:
				this.volume4.Render(renderContext);
				break;
		}

		renderContext.restore();

		return [];
	}

	private changeVolume()
	{
		this.opacity = 1;
		
		this.level = Math.round(this.level >= 4 ? 0 : this.level + 1);
		
		this.sounds.forEach((sound: Sound) => {
			sound.volume = this.level / 5;
		});
	}

	public createSound(path: string, options: ISoundOptions): Sound
	{
		let newSound = new Sound(path, options);

		newSound.volume = this.level / 5;

		this.sounds.push(newSound);

		return newSound;
	}
}