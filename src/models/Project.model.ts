import { Timer } from './Timer.model';

export class Project {

    public projectId: number;
    public name: string;
    public isArchived: boolean;
    public totalDuration: boolean;
    public lastModified: boolean;

    public timers: Timer[];

    constructor(
    ) {
        this.isArchived = false;
    }

}