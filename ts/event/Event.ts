class Event {
    public readonly type: string | symbol;
    // public target: unknown;
    // public currentTarget: unknown;
    private _target: unknown = null;
    private _currentTarget: unknown = null;
    private _isFrozen: boolean = false;

    constructor(type: string | symbol) {
        this.type = type;
    }

    public get target(): unknown {
        return this._target;
    }

    public set target(target: unknown) {
        if (!this._isFrozen) {
            this._target = target;
        }
    }

    public get currentTarget(): unknown {
        return this._currentTarget;
    }

    public set currentTarget(currentTarget: unknown) {
        if (!this._isFrozen) {
            this._currentTarget = currentTarget;
        }
    }

    public clone(): Event {
        return new Event(this.type);
    }

    public freeze(): Event {
        this._isFrozen = true;
        return this;
    }
}

export default Event;
