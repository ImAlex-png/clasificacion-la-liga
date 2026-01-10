export class Equipo {
    private _nombre: string;
    private _puntos: number;
    private _pj: number;
    private _pg: number;
    private _pe: number;
    private _pp: number;
    private _gf: number;
    private _gc: number;

    constructor(
        nombre: string,
        puntos: number = 0,
        pj: number = 0,
        pg: number = 0,
        pe: number = 0,
        pp: number = 0,
        gf: number = 0,
        gc: number = 0
    ) {
        this._nombre = nombre;
        this._puntos = puntos;
        this._pj = pj;
        this._pg = pg;
        this._pe = pe;
        this._pp = pp;
        this._gf = gf;
        this._gc = gc;
    }

    // Getters
    get nombre(): string { return this._nombre; }
    get puntos(): number { return this._puntos; }
    get pj(): number { return this._pj; }
    get pg(): number { return this._pg; }
    get pe(): number { return this._pe; }
    get pp(): number { return this._pp; }
    get gf(): number { return this._gf; }
    get gc(): number { return this._gc; }
    get dg(): number { return this._gf - this._gc; }  // diferencia de goles

    registrarResultado(golesFavor: number, golesContra: number): void {
        this._pj++;
        this._gf += Math.max(0, golesFavor);
        this._gc += Math.max(0, golesContra);

        if (golesFavor > golesContra) {
            this._puntos += 3;
            this._pg++;
        } else if (golesFavor === golesContra) {
            this._puntos += 1;
            this._pe++;
        } else {
            this._pp++;
        }
    }

    
}