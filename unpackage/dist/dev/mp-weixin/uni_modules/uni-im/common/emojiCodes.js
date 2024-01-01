"use strict";
const emojiCodes = `😀,😁,😂,🤣,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,☺️,🙂,🤗,🤩,🤔,🤨,😐,😑,😶,🙄,😏,😣,😥,😮,🤐,😯,😪,😫,😴,😌,😛,😜,😝,🤤,😒,😓,😔,😕,🙃,🤑,😲,☹️,🙁,😖,😞,😟,😤,😢,😭,😦,😧,😨,😩,🤯,😬,😰,😱,😳,🤪,😵,😡,😠,🤬,😷,🤒,🤕,🤢,🤮,🤧,😇,🤠,🤡,🤥,🤫,🤭,🧐,🤓,😈,👿,👹,👺,💀,☠️,👻,👽,🤖,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🙈,🙉,🙊,👶,🧒,👦,👧,🧑,👨,👩,🧓,👴,👵,👨‍⚕️,👩‍⚕️,👨‍🎓,👩‍🎓,👨‍🏫,👩‍🏫,👨‍⚖️,👩‍⚖️,👨‍🌾,👩‍🌾,👨‍🍳,👩‍🍳,👨‍🔧,👩‍🔧,👨‍🏭,👩‍🏭,👨‍💼,👩‍💼,👨‍🔬,👩‍🔬,👨‍💻,👩‍💻,👨‍🎤,👩‍🎤,👨‍🎨,👩‍🎨,👨‍✈️,👩‍✈️,👨‍🚀,👩‍🚀,👨‍🚒,👩‍🚒,👮,👮‍♂️,👮‍♀️,🕵️,🕵️‍♂️,🕵️‍♀️,💂,💂‍♂️,💂‍♀️,👷,👷‍♂️,👷‍♀️,🤴,👸,👳,👳‍♂️,👳‍♀️,👲,🧕,🧔,👱,👱‍♂️,👱‍♀️,🤵,👰,🤰,🤱,👼,🎅,🤶,🧙,🧙‍♀️,🧙‍♂️,🧚,🧚‍♀️,🧚‍♂️,🧛,🧛‍♀️,🧛‍♂️,🧜,🧜‍♀️,🧜‍♂️,🧝,🧝‍♀️,🧝‍♂️,🧞,🧞‍♀️,🧟,🧟‍♀️,🙍,🙍‍♂️,🙍‍♀️,🙎,🙎‍♂️,🙎‍♀️,🙅,🙅‍♂️,🙅‍♀️,🙆,🙆‍♂️,🙆‍♀️,💁,💁‍♂️,💁‍♀️,🙋,🙋‍♂️,🙋‍♀️,🙇,🙇‍♂️,🙇‍♀️,🤦,🤦‍♂️,🤦‍♀️,🤷,🤷‍♂️,🤷‍♀️,💆,💆‍♂️,💆‍♀️,💇,💇‍♂️,💇‍♀️,🚶,🚶‍♂️,🚶‍♀️,🏃,🏃‍♂️,🏃‍♀️,💃,🕺,👯,👯‍♂️,👯‍♀️,🧖,🧖‍♀️,🧖‍♂️,🧗,🧗‍♀️,🧗‍♂️,🧘,🧘‍♀️,🧘‍♂️,🕴️,👤,👥,👫,👬,👭,💏,👨‍❤️‍💋‍👨,👩‍❤️‍💋‍👩,💑,👨‍❤️‍👨,👩‍❤️‍👩,👪,👨‍👩‍👧,👨‍👩‍👧‍👦,👨‍👩‍👦‍👦,👨‍👩‍👧‍👧,👨‍👨‍👦,👨‍👨‍👧,👨‍👨‍👧‍👦,👨‍👨‍👦‍👦,👨‍👨‍👧‍👧,👩‍👩‍👦,👩‍👩‍👧,👩‍👩‍👧‍👦,👩‍👩‍👦‍👦,👩‍👩‍👧‍👧,👨‍👦,👨‍👧,👨‍👧‍👦,👨‍👧‍👧,👩‍👦‍👦,👩‍👧,👩‍👧‍👦,🤳,👃,👅,👄,💋,💘,❤️,💓,💔,💕,💖,💗,💙,💚,💛,🧡,💜,🖤,💝,💞,❣️,💌,💬,🌬️,☃️,⛄,🎎,🗿,👾,💩,🛀,🛌,💅,👂,👣,👀,👁️,🧠,💭,👓,👔,👕,👖,🧣,🧤,🧥,🧦,👗,👘,👙,👚,👛,👜,👝,🎒,👞,👟,👠,👡,👢,👑,👒,🎩,🎓,🧢,📿,💄,💍,💎,🥄,🔪,🏺,🗺️,🗾,🎠,🎡,🎢,💈,🎪,🛰️,🚀,🛸,🛎️,⌛,⏳,⌚,⏰,🕰️,🌡️,🌂,☂️,☔,⛱️,⚡,🎃,🎄,🎆,🎇,🎈,🎉,🎊,🎏,🎐,🎑,🎀,🎁,🎗️,🎟️,🎫,🔮,🎮,🕹️,🎰,🃏,🎴,🎭,🖼️,🎨,🔇,🔈,🔉,🔊,📢,📣,📯,🔔,🔕,🎼,🎵,🎶,🎙️,🎚️,🎛️,🎤,🎧,📻,🎷,🎸,🎹,🎺,🎻,🥁,📱,📲,☎️,📞,📟,📠,🔋,🔌,💻,🖥️,🖨️,⌨️,🖱️,🖲️,💽,💾,💿,📀,🎥,🎞️,📽️,🎬,📺,📷,📸,📹,📼,🔍,🔎,💡,🔦,🏮,📔,📕,📖,📗,📘,📙,📚,📓,📒,📃,📜,📄,📰,📑,🔖,💰,💴,💵,💶,💷,💸,💳,✉️,📧,📨,📩,📤,📥,📦,📫,📪,📬,📭,📮,✏️,✒️,📝,💼,📁,📂,📅,📆,📇,📈,📉,📊,📋,📌,📍,📎,📏,📐,✂️,🔒,🔓,🔏,🔐,🔑,🔨,🔫,🔧,🔩,🔬,🔭,📡,💉,💊,🚪,🚽,🚿,🛁,🛒,🚬,🔅,🔆,⚜️,🔱,📛,🚂,🚃,🚄,🚅,🚆,🚇,🚈,🚉,🚊,🚝,🚞,🚋,🚌,🚍,🚎,🚐,🚑,🚒,🚓,🚔,🚕,🚖,🚗,🚘,🚙,🚚,🚛,🚜,🚲,🛴,🛵,🚏,🛣️,🛤️,🛢️,⛽,🚨,🚥,🚦,🛑,🚧,⛵,🛶,🚤,🛳️,⛴️,🛥️,🚢,✈️,🛩️,🛫,🛬,💺,🚁,🚟,🚠,🚡,⚠️,⛔,🦗,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🥝,🍅,🥥,🥑,🍆,🥔,🥕,🌽,🌶️,🥒,🥦,🥜,🍞,🥐,🥖,🥨,🥞,🧀,🍖,🍗,🥩,🥓,🍔,🍟,🍕,🌭,🥪,🌮,🌯,🥙,🥚,🍳,🥘,🍲,🥣,🥗,🍿,🥫,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🥟,🥠,🥡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🥧,🍫,🍬,🍭,🍮,🍯,🍼,🥛,☕,🍵,🍶,🍾,🍷,🍸,🍹,🍺,🍻,🥂,🥃,🥤,🥢,🍽️,🍴`.split(",");
exports.emojiCodes = emojiCodes;