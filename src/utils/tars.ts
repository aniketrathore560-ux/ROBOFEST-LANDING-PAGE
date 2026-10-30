export interface TarsResponse {
  headline: string;
  commentary: string;
  actionPose: 'idle' | 'scanning' | 'articulating' | 'alert' | 'calculating';
}

/**
 * Generates context-aware TARS dialogue for questions and guide interactions.
 */
export function getTarsResponseForQuestion(
  questionId: number,
  humorLevel: number = 75,
  honestyLevel: number = 90
): TarsResponse {
  switch (questionId) {
    case 1:
      return {
        headline: 'WEIGHT & WEAPON LIMITS',
        commentary:
          honestyLevel > 80
            ? 'Featherweight 15kg, Middleweight 30kg. If your bot is 30.1kg, the scale will reject you, Cooper.'
            : 'Weight classes strictly enforced within standard arena tolerances.',
        actionPose: 'articulating',
      };
    case 2:
      return {
        headline: 'INTER-INSTITUTE TEAMS',
        commentary:
          humorLevel > 60
            ? 'Cross-college teams are authorized. Cooperation improves victory odds by 87.4%.'
            : 'Multi-institutional crews permitted across all four competition categories.',
        actionPose: 'calculating',
      };
    case 3:
      return {
        headline: 'SAFETY & KILL-SWITCH',
        commentary:
          'Mechanical master kill-switch is mandatory. Any rogue machine will be deactivated immediately.',
        actionPose: 'alert',
      };
    case 4:
      return {
        headline: 'ARENA & PID SPECIFICATIONS',
        commentary:
          humorLevel > 70
            ? 'Maze walls are non-reflective. Tuning your PID on the fly? Cooper, this is no time for caution.'
            : 'Sensors must withstand optical glare and dark high-contrast arena surfaces.',
        actionPose: 'scanning',
      };
    case 5:
      return {
        headline: 'ACCOMMODATION AT NIT RAIPUR',
        commentary:
          'Campus guest house and hostel boarding available for outstation teams upon slot allocation.',
        actionPose: 'idle',
      };
    default:
      return {
        headline: 'SYSTEM READY',
        commentary: 'Awaiting your tactical query. Ready to calculate trajectory.',
        actionPose: 'idle',
      };
  }
}
