export type TutorialState = 
      "Salutations"
    | "DraggingCannonInstructions"
    | "ToDragCannon"
    | "DraggedCannon"
    | "DraggingVelocityInstructions"
    | "ToDragVelocity"
    | "DraggedVelocity"
    | "DragHeightArrowInstructions"
    | "ToDragHeightArrow"
    | "DraggedHeightArrow"
    | "InputPanelInstructions"
    | "ToUseInputPanel"
    | "UsedInputPanel"
    | "PanToTargetInstructions"
    | "ToPanToTarget"
    | "PannedToTarget"
    | "ToFireAtTarget"
    | "FiredAtTarget"
    | "HitTarget"
    | "MissedTarget"
    | "CompletedTutorial"

export const tutorialStates = [
  "Salutations", 
  "DraggingCannonInstructions", 
  "ToDragCannon", 
  "DraggedCannon", 
  "DraggingVelocityInstructions", 
  "ToDragVelocity", 
  "DraggedVelocity", 
  "DragHeightArrowInstructions", 
  "ToDragHeightArrow", 
  "DraggedHeightArrow", 
  "InputPanelInstructions", 
  "ToUseInputPanel", 
  "UsedInputPanel", 
  "PanToTargetInstructions",
  "ToPanToTarget", 
  "PannedToTarget", 
  "ToFireAtTarget", 
  "FiredAtTarget", 
  "HitTarget", 
  "MissedTarget", 
  "CompletedTutorial"
] as TutorialState[]