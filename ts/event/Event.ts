class Event {
    public readonly type: string | symbol;
    public target: unknown;
    public currentTarget: unknown;

    constructor(type: string | symbol) {
        this.type = type;
    }
}

export default Event;
