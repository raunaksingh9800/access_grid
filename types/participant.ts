// src/types/participant.ts

export interface Participant {
    id: string;
    name: string;
    email: string;
    sip_id: string;
}

export interface ParticipantDetails {
    id: string;
    participant_id: string;
    input_1: string; // Project title
    input_2: string; // Description
    input_3: string; // End users
}

export interface Team {
    id: string;
    name: string;
    SDG: string;
    guide_id: string;
    allocated_room: string;
}

export interface Guide {
    id: string;
    name: string;
    department: string;
    email: string;
}

export interface Room {
    id: string;
    name: string;
    panel_id: string;
}

export interface Evaluator {
    id: string;
    name: string;
    email: string;
}

export interface DashboardData {
    team: Team;
    teammates: Pick<Participant, 'name' | 'email'>[];
    guide: Guide | null;
    room: Room | null;
    evaluators: Evaluator[];
}

export interface QueueData {
    id: string;
    team_id: string;
    room_id: string;
    position: number;
    status: string;
    team: { name: string };
}

export interface DetailsFormInputs {
    input_1: string;
    input_2: string;
    input_3: string;
}