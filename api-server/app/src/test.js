import { utf8ToString } from './components/utils/decoderUtils.js'


//################# TEST METHODS ####################


function EncodingTest01()
{
    var testString = "=?utf-8?Q?Str=C3=BCsse=5F122b=5F12247=5FBerlin=5F1=5FFloorPlan.pdf?=";

    console.log(utf8ToString(testString, "="));
}


//################# TEST METHODS INVOKING ####################


EncodingTest01();