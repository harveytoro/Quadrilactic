import {Entity} from "entitySystem/entity";
import {System} from "entitySystem/system";
import {Orchestrator} from "entitySystem/orchestrator";

export class RenderSystem implements System {
	public Update(entity: Entity, orchestrator: Orchestrator, deltaTime: number): void {
		console.log("TODO");
	}
}