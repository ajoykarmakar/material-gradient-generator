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
      Red: `${materialColours.red[this._darkShade]} ${materialColours.red[this._lightShade]}`,
      Pink: `${materialColours.pink[this._darkShade]}, ${materialColours.pink[this._lightShade]}`,
      Purple: `${materialColours.purple[this._darkShade]}, ${materialColours.purple[this._lightShade]}`,
      DeepPurple: `${materialColours.deepPurple[this._darkShade]}, ${materialColours.deepPurple[this._lightShade]}`,
      Indigo: `${materialColours.indigo[this._darkShade]}, ${materialColours.indigo[this._lightShade]}`,
      Blue: `${materialColours.blue[this._darkShade]}, ${materialColours.blue[this._lightShade]}`,
      LightBlue: `${materialColours.lightBlue[this._darkShade]}, ${materialColours.lightBlue[this._lightShade]}`,
      Cyan: `${materialColours.cyan[this._darkShade]}, ${materialColours.cyan[this._lightShade]}`,
      Teal: `${materialColours.teal[this._darkShade]}, ${materialColours.teal[this._lightShade]}`,
      Green: `${materialColours.green[this._darkShade]}, ${materialColours.green[this._lightShade]}`,
      LightGreen: `${materialColours.lightGreen[this._darkShade]}, ${materialColours.lightGreen[this._lightShade]}`,
      Lime: `${materialColours.lime[this._darkShade]}, ${materialColours.lime[this._lightShade]}`,
      Yellow: `${materialColours.yellow[this._darkShade]}, ${materialColours.yellow[this._lightShade]}`,
      Amber: `${materialColours.amber[this._darkShade]}, ${materialColours.amber[this._lightShade]}`,
      Orange: `${materialColours.orange[this._darkShade]}, ${materialColours.orange[this._lightShade]}`,
      DeepOrange: `${materialColours.deepOrange[this._darkShade]}, ${materialColours.deepOrange[this._lightShade]}`,
      Brown: `${materialColours.brown[this._darkShade]}, ${materialColours.brown[this._lightShade]}`,
      Grey: `${materialColours.grey[this._darkShade]}, ${materialColours.grey[this._lightShade]}`,
      BlueGrey: `${materialColours.blueGrey[this._darkShade]}, ${materialColours.blueGrey[this._lightShade]}`
    };

    return colours;
  }

  /**
   * Returns iterable generator of material gradent css properties.
   **/
  * _initializeGradientGenerator(): IterableIterator<string> {
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
