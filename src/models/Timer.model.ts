import { Project } from './Project.model';

export class Timer {

    public timerId: number;

    public duration: number;
    public startDate: string;
    public endDate: string;

    public isModified: boolean;
    public initialStartDate: string;
    public initialEndDate: string;

    public projectId: number;
    public project: Project;

    constructor(
    ) {
    }

}
