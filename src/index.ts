import * as materialColours from "material-ui-colors";

interface Colours {
    Red: string;
    Pink: string;
    Purple: string;
    DeepPurple: string;
    Indigo: string;
    Blue: string;
    LightBlue: string;
    Cyan: string;
    Teal: string;
    Green: string;
    LightGreen: string;
    Lime: string;
    Yellow: string;
    Amber: string;
    Orange: string;
    DeepOrange: string;
    Brown: string;
    Grey: string;
    BlueGrey: string;
};

class MaterialGradientGenerator {
    _gradientGenerator: IterableIterator<string>;
    _excludeRed?: boolean;
    _colours: Colours;
    _darkShade?: number;
    _lightShade?: number;
    _step?: number;


    /**
     * Sets 'exclude red', 'skip'.
     * Returns gradient collection as GENERATOR.
     **/
    constructor(excludeRed?: boolean, darkShade?: number, lightShade?: number, _step?: number) {
        this._excludeRed = excludeRed;
        this._step = _step;
        this._darkShade = darkShade || 400;
        this._lightShade = lightShade || 200;
        this._colours = this._initializeColours();
        this._gradientGenerator = this._initializeGradientGenerator();
    }

    _initializeColours(): Colours {
        /** Colours [levels 400/200 Material Design]
    
    * These colours are class level properties in the
    * scenario where you want to access specific colours
    * directly from the frontend. **/
        const colours: Colours = {
            Red = [red[400], red[200]];
  Pink = [pink[400], pink[200]];
  Purple = [purple[400], purple[200]];
  DeepPurple = [deepPurple[400], deepPurple[200]];
  Indigo = [indigo[400], indigo[200]];
  Blue = [blue[400], blue[200]];
  LightBlue = [lightBlue[400], lightBlue[200]];
  Cyan = [cyan[400], cyan[200]];
  Teal = [teal[400], teal[200]];
  Green = [green[400], green[200]];
  LightGreen = [lightGreen[400], lightGreen[200]];
  Lime = [lime[400], lime[200]];
  Yellow = [yellow[400], yellow[200]];
  Amber = [amber[400], amber[200]];
  Orange = [orange[400], orange[200]];
  DeepOrange = [deepOrange[400], deepOrange[200]];
  Brown = [brown[400], brown[200]];
  Grey = [grey[400], grey[200]];
  BlueGrey = [blueGrey[400], blueGrey[200]];
        };

        return colours;
    }

    /**
     * Returns iterable generator of material gradent css properties.
     **/
    *_initializeGradientGenerator(): IterableIterator<string> {
        let gradients = [
            this._colours.Red,
            this._colours.Pink,
            this._colours.Purple,
            this._colours.DeepPurple,
            this._colours.Indigo,
            this._colours.Blue,
            this._colours.LightBlue,
            this._colours.Cyan,
            this._colours.Teal,
            this._colours.Green,
            this._colours.LightGreen,
            this._colours.Lime,
            this._colours.Yellow,
            this._colours.Amber,
            this._colours.Orange,
            this._colours.DeepOrange,
            this._colours.Brown,
            this._colours.Grey,
            this._colours.BlueGrey
        ];

        if (this._excludeRed || this._excludeRed === undefined) {
            gradients = gradients.filter(
                (colour) => colour !== this._colours.Red && colour !== this._colours.Pink
            );
        }

        if (this._step === undefined || this._step === 0) {
            this._step = 1;
        }

        for (let i = 0; i <= gradients.length; i += this._step) {
            yield gradients[i];
        }
    }

    /**
     * Interfaces with iterable generator to get the 'next' colour in the generator.
     * The gradient generator will re-instantiate if 'done'.
     **/
    NextColour(): IteratorResult<string> {
        // Get next colour object
        let nextColour = this._gradientGenerator.next();

        if (nextColour.done) {
            // Re-instantiate gradient generator & set 'next' colour
            this._gradientGenerator = this._initializeGradientGenerator();
            nextColour = this._gradientGenerator.next();
        }

        return nextColour;
    }
};

export { MaterialGradientGenerator as materialGradientGenerator };  
