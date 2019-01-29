let _messages   = {},
  _domains      = [],
  _sPluralRegex = new RegExp(/^\w+\: +(.+)$/),
  _cPluralRegex = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
  _iPluralRegex = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/);

/**
 * Fallback locale.
 *
 * @type {String}
 * @api public
 */
let fallback = 'en',

/**
 * Placeholder prefix.
 *
 * @type {String}
 * @api public
 */
  placeHolderPrefix = '%',

/**
 * Placeholder suffix.
 *
 * @type {String}
 * @api public
 */
  placeHolderSuffix = '%',

/**
 * Default domain.
 *
 * @type {String}
 * @api public
 */
  defaultDomain = 'messages',

/**
 * Plural separator.
 *
 * @type {String}
 * @api public
 */
  pluralSeparator = '|';
  
/**
 * The logic comes from the Symfony2 PHP Framework.
 *
 * Given a message with different plural translations separated by a
 * pipe (|), this method returns the correct portion of the message based
 * on the given number, the current locale and the pluralization rules
 * in the message itself.
 *
 * The message supports two different types of pluralization rules:
 *
 * interval: {0} There is no apples|{1} There is one apple|]1,Inf] There is %count% apples
 * indexed:  There is one apple|There is %count% apples
 *
 * The indexed solution can also contain labels (e.g. one: There is one apple).
 * This is purely for making the translations more clear - it does not
 * affect the functionality.
 *
 * The two methods can also be mixed:
 *     {0} There is no apples|one: There is one apple|more: There is %count% apples
 *
 * @param {String} message  The message id
 * @param {Number} number   The number to use to find the indice of the message
 * @param {String} locale   The locale
 * @return {String}         The message part to use for translation
 * @api private
 */
function pluralize(message, number, locale) {
  const parts = message.split(pluralSeparator);
  let e,
    matches = [],
    standardRules = [],
    explicitRules = [];
  for (let p = 0; p < parts.length; p++) { 
    let part = parts[p];
    if (_cPluralRegex.test(part)) {
      matches = part.match(_cPluralRegex);
      explicitRules[matches[0]] = matches[matches.length - 1];
    } else if (_sPluralRegex.test(part)) {
      matches = part.match(_sPluralRegex);
      standardRules.push(matches[1]);
    } else {
      standardRules.push(part);
    }
  }

  for (e in explicitRules) {
    if (_iPluralRegex.test(e)) {
      matches = e.match(_iPluralRegex);

      if (matches[1]) {
        let ns = matches[2].split(','),
          n;

        for (n in ns) {
          if (number == ns[n]) {
            return explicitRules[e];
          }
        }
      } else {
        let leftNumber  = convert_number(matches[4]);
        var rightNumber = convert_number(matches[5]);

        if (('[' === matches[3] ? number >= leftNumber : number > leftNumber) &&
          (']' === matches[6] ? number <= rightNumber : number < rightNumber)) {
          return explicitRules[e];
        }
      }
    }
  }

  return standardRules[plural_position(number, locale)] || standardRules[0] || undefined;
}
 
/**
 * The logic comes from the Symfony2 PHP Framework.
 *
 * Convert number as String, "Inf" and "-Inf"
 * values to number values.
 *
 * @param {String} number   A literal number
 * @return {Number}         The int value of the number
 * @api private
 */
function convert_number(number) {
  if ('-Inf' === number) {
    return Number.NEGATIVE_INFINITY;
  } else if ('+Inf' === number || 'Inf' === number) {
    return Number.POSITIVE_INFINITY;
  }

  return parseInt(number, 10);
}
  
/**
 * The logic comes from the Symfony2 PHP Framework.
 *
 * Returns the plural position to use for the given locale and number.
 *
 * @param {Number} number  The number to use to find the indice of the message
 * @param {String} locale  The locale
 * @return {Number}        The plural position
 * @api private
 */
function plural_position(number, locale) {
  var _locale = locale;

  if ('pt_BR' === _locale) {
    _locale = 'xbr';
  }

if (_locale.length > 3) {
  _locale = _locale.split('_')[0];
}

switch (_locale) {
  case 'bo':
  case 'dz':
  case 'id':
  case 'ja':
  case 'jv':
  case 'ka':
  case 'km':
  case 'kn':
  case 'ko':
  case 'ms':
  case 'th':
  case 'tr':
  case 'vi':
  case 'zh':
    return 0;
  case 'af':
  case 'az':
  case 'bn':
  case 'bg':
  case 'ca':
  case 'da':
  case 'de':
  case 'el':
  case 'en':
  case 'eo':
  case 'es':
  case 'et':
  case 'eu':
  case 'fa':
  case 'fi':
  case 'fo':
  case 'fur':
  case 'fy':
  case 'gl':
  case 'gu':
  case 'ha':
  case 'he':
  case 'hu':
  case 'is':
  case 'it':
  case 'ku':
  case 'lb':
  case 'ml':
  case 'mn':
  case 'mr':
  case 'nah':
  case 'nb':
  case 'ne':
  case 'nl':
  case 'nn':
  case 'no':
  case 'om':
  case 'or':
  case 'pa':
  case 'pap':
  case 'ps':
  case 'pt':
  case 'so':
  case 'sq':
  case 'sv':
  case 'sw':
  case 'ta':
  case 'te':
  case 'tk':
  case 'ur':
  case 'zu':
    return (number == 1) ? 0 : 1;

  case 'am':
  case 'bh':
  case 'fil':
  case 'fr':
  case 'gun':
  case 'hi':
  case 'ln':
  case 'mg':
  case 'nso':
  case 'xbr':
  case 'ti':
  case 'wa':
    return ((number === 0) || (number == 1)) ? 0 : 1;

  case 'be':
  case 'bs':
  case 'hr':
  case 'ru':
  case 'sr':
  case 'uk':
    return ((number % 10 == 1) && (number % 100 !== 11)) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

  case 'cs':
  case 'sk':
    return (number == 1) ? 0 : (((number >= 2) && (number <= 4)) ? 1 : 2);

  case 'ga':
    return (number == 1) ? 0 : ((number == 2) ? 1 : 2);

  case 'lt':
    return ((number % 10 == 1) && (number % 100 !== 11)) ? 0 : (((number % 10 >= 2) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

  case 'sl':
    return (number % 100 == 1) ? 0 : ((number % 100 == 2) ? 1 : (((number % 100 == 3) || (number % 100 == 4)) ? 2 : 3));

  case 'mk':
    return (number % 10 == 1) ? 0 : 1;

  case 'mt':
    return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 1) && (number % 100 < 11))) ? 1 : (((number % 100 > 10) && (number % 100 < 20)) ? 2 : 3));

  case 'lv':
    return (number === 0) ? 0 : (((number % 10 == 1) && (number % 100 !== 11)) ? 1 : 2);

  case 'pl':
    return (number == 1) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 12) || (number % 100 > 14))) ? 1 : 2);

  case 'cy':
    return (number == 1) ? 0 : ((number == 2) ? 1 : (((number == 8) || (number == 11)) ? 2 : 3));

  case 'ro':
    return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 0) && (number % 100 < 20))) ? 1 : 2);

  case 'ar':
    return (number === 0) ? 0 : ((number == 1) ? 1 : ((number == 2) ? 2 : (((number >= 3) && (number <= 10)) ? 3 : (((number >= 11) && (number <= 99)) ? 4 : 5))));

  default:
    return 0;
  }
}


export default (key, context) => {

  let translationsObject = context.translationsObject ? context.translationsObject : {};

  console.log(context)

  let translation = key;

  if (translationsObject !== undefined && translationsObject[key] !== undefined) {
    translation = translationsObject[key];

    let message = context.count ? pluralize(translation, context.count) : translation;
    const matches = message.match(/(%([^%]|%%)*%)/g);

    if (matches) {
      matches.forEach((match) => {
        const prop = match.replace(/[%]+/g, '');
    
        // if (!Object.prototype.hasOwnProperty.call(context, prop)) {
        //   return;
        // }

        const regex = new RegExp(match, 'g');
        message = message.replace(regex, context[prop]);
        console.log(prop, match, message)
      });
    }

    translation = message;

  }

  // if (typeof context === 'object') {
  //   const matches = translation.match(/(%([^%]|%%)*%)/g);

  //   if (matches) {
  //     matches.forEach((match) => {
  //       const prop = match.replace(/[%]+/g, '');
  //       if (!Object.prototype.hasOwnProperty.call(context, prop)) {
  //         return;
  //       }

  //       const regex = new RegExp(match, 'g');
  //       translation = translation.replace(regex, context[prop]);
  //     });
  //   }
  // }

  return translation;
};
