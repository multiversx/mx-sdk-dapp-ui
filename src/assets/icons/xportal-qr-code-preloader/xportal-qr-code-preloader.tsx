import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-xportal-qr-code-preloader',
  styleUrl: 'xportal-qr-code-preloader.scss',
  shadow: true,
})
export class XPortalQrCodePreloader {
  @Prop() class?: string;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 302 300"
        class={{ 'xportal-qr-code-preloader': true, [this.class]: Boolean(this.class) }}
      >
        <g opacity="0.5">
          <path d="M108.94 0H96.9403V12.0001H108.94V0Z" fill="url(#paint0_linear_8712_31655)" />
          <path d="M120.941 0H108.94V12.0001H120.941V0Z" fill="url(#paint1_linear_8712_31655)" />
          <path d="M132.938 0H120.938V12.0001H132.938V0Z" fill="url(#paint2_linear_8712_31655)" />
          <path d="M180.94 0H168.94V12.0001H180.94V0Z" fill="url(#paint3_linear_8712_31655)" />
          <path d="M192.941 0H180.94V12.0001H192.941V0Z" fill="url(#paint4_linear_8712_31655)" />
          <path d="M204.938 0H192.938V12.0001H204.938V0Z" fill="url(#paint5_linear_8712_31655)" />
          <path
            d="M168.94 12.0001L156.94 12.0005V24.0006H168.94L168.94 12.0001Z"
            fill="url(#paint6_linear_8712_31655)"
          />
          <path d="M204.938 12.0001H192.938V24.0006H204.938V12.0001Z" fill="url(#paint7_linear_8712_31655)" />
          <path d="M108.94 23.9994H96.9403V35.9995H108.94V23.9994Z" fill="url(#paint8_linear_8712_31655)" />
          <path d="M132.938 23.9994H120.938V35.9995H132.938V23.9994Z" fill="url(#paint9_linear_8712_31655)" />
          <path d="M144.939 23.9994H132.938V35.9995H144.939V23.9994Z" fill="url(#paint10_linear_8712_31655)" />
          <path d="M156.939 23.9994H144.939V35.9995H156.939V23.9994Z" fill="url(#paint11_linear_8712_31655)" />
          <path d="M192.941 23.9994H180.941V35.9995H192.941V23.9994Z" fill="url(#paint12_linear_8712_31655)" />
          <path d="M108.94 35.9984H96.9403V47.9984H108.94V35.9984Z" fill="url(#paint13_linear_8712_31655)" />
          <path d="M120.941 35.9984H108.94V47.9984H120.941V35.9984Z" fill="url(#paint14_linear_8712_31655)" />
          <path d="M180.94 35.9984H168.94V47.9984H180.94V35.9984Z" fill="url(#paint15_linear_8712_31655)" />
          <path d="M192.941 35.9984H180.94V47.9984H192.941V35.9984Z" fill="url(#paint16_linear_8712_31655)" />
          <path d="M204.938 35.9984H192.938V47.9984H204.938V35.9984Z" fill="url(#paint17_linear_8712_31655)" />
          <path d="M108.94 47.9984H96.9403V59.9989H108.94V47.9984Z" fill="url(#paint18_linear_8712_31655)" />
          <path d="M120.941 47.9984H108.94V59.9989H120.941V47.9984Z" fill="url(#paint19_linear_8712_31655)" />
          <path d="M156.939 47.9989H144.939V59.9989H156.939V47.9989Z" fill="url(#paint20_linear_8712_31655)" />
          <path d="M180.94 47.9984H168.94V59.9989H180.94V47.9984Z" fill="url(#paint21_linear_8712_31655)" />
          <path d="M204.938 47.9984H192.938V59.9989H204.938V47.9984Z" fill="url(#paint22_linear_8712_31655)" />
          <path d="M120.941 59.9989H108.94L108.941 71.9994H120.941V59.9989Z" fill="url(#paint23_linear_8712_31655)" />
          <path
            d="M144.939 59.9989L132.939 59.9994V71.9994H144.939L144.939 59.9989Z"
            fill="url(#paint24_linear_8712_31655)"
          />
          <path d="M180.94 59.9989H168.94V71.9994H180.94V59.9989Z" fill="url(#paint25_linear_8712_31655)" />
          <path d="M192.941 59.9994L180.94 59.9989V71.9994H192.941V59.9994Z" fill="url(#paint26_linear_8712_31655)" />
          <path d="M204.938 59.9989H192.938V71.9994H204.938V59.9989Z" fill="url(#paint27_linear_8712_31655)" />
          <path
            d="M108.941 71.9994L96.9403 71.9999V83.9999H108.94L108.941 71.9994Z"
            fill="url(#paint28_linear_8712_31655)"
          />
          <path
            d="M132.939 71.9994L120.938 71.9999V83.9999H132.938L132.939 71.9994Z"
            fill="url(#paint29_linear_8712_31655)"
          />
          <path
            d="M156.939 71.9999L144.939 71.9994L144.939 83.9999H156.939V71.9999Z"
            fill="url(#paint30_linear_8712_31655)"
          />
          <path d="M180.94 71.9994H168.94V83.9999H180.94V71.9994Z" fill="url(#paint31_linear_8712_31655)" />
          <path d="M204.938 71.9994H192.938V83.9999H204.938V71.9994Z" fill="url(#paint32_linear_8712_31655)" />
          <path
            d="M120.941 84.0004L108.94 83.9999L108.941 96.0004H120.941V84.0004Z"
            fill="url(#paint33_linear_8712_31655)"
          />
          <path d="M156.939 83.9999H144.939V96.0004H156.939V83.9999Z" fill="url(#paint34_linear_8712_31655)" />
          <path
            d="M192.941 84.0004L180.94 83.9999L180.941 96.0004H192.941V84.0004Z"
            fill="url(#paint35_linear_8712_31655)"
          />
          <path d="M204.938 83.9999H192.938V96.0004H204.938V83.9999Z" fill="url(#paint36_linear_8712_31655)" />
          <path d="M12.9395 96.0009H0.939453V108.001H12.9395V96.0009Z" fill="url(#paint37_linear_8712_31655)" />
          <path d="M24.94 96.0009H12.9395V108.001H24.94V96.0009Z" fill="url(#paint38_linear_8712_31655)" />
          <path d="M36.9374 96.0009H24.9373V108.001H36.9374V96.0009Z" fill="url(#paint39_linear_8712_31655)" />
          <path d="M48.9379 96.0009H36.9374V108.001H48.9379V96.0009Z" fill="url(#paint40_linear_8712_31655)" />
          <path d="M84.9394 96.0009H72.9393V108.001H84.9394V96.0009Z" fill="url(#paint41_linear_8712_31655)" />
          <path
            d="M108.941 96.0004L96.9403 96.0009V108.001H108.94L108.941 96.0004Z"
            fill="url(#paint42_linear_8712_31655)"
          />
          <path d="M156.939 96.0004H144.939V108.001H156.939V96.0004Z" fill="url(#paint43_linear_8712_31655)" />
          <path d="M168.94 96.0009L156.939 96.0004V108.001H168.94V96.0009Z" fill="url(#paint44_linear_8712_31655)" />
          <path
            d="M180.941 96.0004L168.94 96.0009V108.001H180.94L180.941 96.0004Z"
            fill="url(#paint45_linear_8712_31655)"
          />
          <path d="M204.938 96.0004H192.938V108.001H204.938V96.0004Z" fill="url(#paint46_linear_8712_31655)" />
          <path d="M216.939 96.0009L204.938 96.0004V108.001H216.939V96.0009Z" fill="url(#paint47_linear_8712_31655)" />
          <path d="M252.94 96.0009H240.94V108.001H252.94V96.0009Z" fill="url(#paint48_linear_8712_31655)" />
          <path d="M264.941 96.0009H252.94V108.001H264.941V96.0009Z" fill="url(#paint49_linear_8712_31655)" />
          <path d="M276.941 96.0009H264.941V108.001H276.941V96.0009Z" fill="url(#paint50_linear_8712_31655)" />
          <path d="M300.939 96.0009H288.939V108.001H300.939V96.0009Z" fill="url(#paint51_linear_8712_31655)" />
          <path d="M12.9395 108H0.939453V120H12.9395V108Z" fill="url(#paint52_linear_8712_31655)" />
          <path d="M24.94 108H12.9395V120H24.94V108Z" fill="url(#paint53_linear_8712_31655)" />
          <path d="M60.9384 108H48.9383V120H60.9384V108Z" fill="url(#paint54_linear_8712_31655)" />
          <path d="M72.9389 108H60.9384V120H72.9389V108Z" fill="url(#paint55_linear_8712_31655)" />
          <path d="M108.94 108H96.9403V120H108.94V108Z" fill="url(#paint56_linear_8712_31655)" />
          <path d="M120.941 108H108.94V120H120.941V108Z" fill="url(#paint57_linear_8712_31655)" />
          <path d="M144.939 108H132.939V120H144.939V108Z" fill="url(#paint58_linear_8712_31655)" />
          <path d="M156.939 108H144.939V120H156.939V108Z" fill="url(#paint59_linear_8712_31655)" />
          <path d="M204.938 108H192.938V120H204.938V108Z" fill="url(#paint60_linear_8712_31655)" />
          <path d="M216.939 108H204.938V120H216.939V108Z" fill="url(#paint61_linear_8712_31655)" />
          <path d="M240.94 108H228.94V120H240.94V108Z" fill="url(#paint62_linear_8712_31655)" />
          <path d="M300.939 108H288.939V120H300.939V108Z" fill="url(#paint63_linear_8712_31655)" />
          <path d="M12.9395 119.999H0.939453V131.999H12.9395V119.999Z" fill="url(#paint64_linear_8712_31655)" />
          <path d="M36.9374 119.999H24.9373V131.999H36.9374V119.999Z" fill="url(#paint65_linear_8712_31655)" />
          <path d="M72.9389 119.999H60.9388V131.999H72.9389V119.999Z" fill="url(#paint66_linear_8712_31655)" />
          <path d="M84.9394 119.999H72.9389V131.999H84.9394V119.999Z" fill="url(#paint67_linear_8712_31655)" />
          <path d="M144.939 119.999H132.939V131.999H144.939V119.999Z" fill="url(#paint68_linear_8712_31655)" />
          <path d="M192.941 119.999H180.941V131.999H192.941V119.999Z" fill="url(#paint69_linear_8712_31655)" />
          <path d="M240.94 119.999H228.94V131.999H240.94V119.999Z" fill="url(#paint70_linear_8712_31655)" />
          <path d="M264.941 119.999H252.941V131.999H264.941V119.999Z" fill="url(#paint71_linear_8712_31655)" />
          <path d="M276.941 119.999H264.941V131.999H276.941V119.999Z" fill="url(#paint72_linear_8712_31655)" />
          <path d="M288.942 119.999H276.941V131.999H288.942V119.999Z" fill="url(#paint73_linear_8712_31655)" />
          <path d="M300.939 119.999H288.939V131.999H300.939V119.999Z" fill="url(#paint74_linear_8712_31655)" />
          <path d="M12.9395 131.999H0.939453V143.999H12.9395V131.999Z" fill="url(#paint75_linear_8712_31655)" />
          <path d="M24.94 131.999L12.9395 131.999V143.999H24.94V131.999Z" fill="url(#paint76_linear_8712_31655)" />
          <path d="M108.94 131.999H96.9403V143.999H108.94V131.999Z" fill="url(#paint77_linear_8712_31655)" />
          <path d="M144.939 131.999H132.939V143.999H144.939V131.999Z" fill="url(#paint78_linear_8712_31655)" />
          <path d="M156.94 131.999H144.939V143.999H156.939L156.94 131.999Z" fill="url(#paint79_linear_8712_31655)" />
          <path d="M192.941 131.999H180.941V143.999H192.941V131.999Z" fill="url(#paint80_linear_8712_31655)" />
          <path
            d="M228.94 131.999L216.939 131.999V143.999H228.939L228.94 131.999Z"
            fill="url(#paint81_linear_8712_31655)"
          />
          <path d="M264.941 131.999H252.941V143.999H264.941V131.999Z" fill="url(#paint82_linear_8712_31655)" />
          <path d="M276.941 131.999H264.941V143.999H276.941V131.999Z" fill="url(#paint83_linear_8712_31655)" />
          <path d="M300.939 131.999H288.939V143.999H300.939V131.999Z" fill="url(#paint84_linear_8712_31655)" />
          <path d="M12.9395 143.999H0.939453V156H12.9395V143.999Z" fill="url(#paint85_linear_8712_31655)" />
          <path d="M36.9374 144H24.9373V156H36.9374V144Z" fill="url(#paint86_linear_8712_31655)" />
          <path d="M48.9379 144H36.9374V156H48.9379V144Z" fill="url(#paint87_linear_8712_31655)" />
          <path d="M84.9394 144H72.9393V156H84.9394V144Z" fill="url(#paint88_linear_8712_31655)" />
          <path d="M96.9403 143.999L84.9394 144V156H96.9399L96.9403 143.999Z" fill="url(#paint89_linear_8712_31655)" />
          <path d="M108.94 143.999H96.9403L96.9399 156H108.94V143.999Z" fill="url(#paint90_linear_8712_31655)" />
          <path d="M120.941 144L108.94 143.999V156H120.941V144Z" fill="url(#paint91_linear_8712_31655)" />
          <path d="M156.939 143.999H144.939L144.939 156H156.939V143.999Z" fill="url(#paint92_linear_8712_31655)" />
          <path d="M192.941 143.999H180.941V156H192.941V143.999Z" fill="url(#paint93_linear_8712_31655)" />
          <path d="M228.939 143.999H216.939V156H228.939V143.999Z" fill="url(#paint94_linear_8712_31655)" />
          <path d="M240.94 144L228.939 143.999V156H240.94V144Z" fill="url(#paint95_linear_8712_31655)" />
          <path d="M252.941 143.999L240.94 144V156H252.94L252.941 143.999Z" fill="url(#paint96_linear_8712_31655)" />
          <path d="M264.941 143.999H252.941L252.94 156H264.941V143.999Z" fill="url(#paint97_linear_8712_31655)" />
          <path d="M288.942 144L276.941 143.999L276.942 156H288.942V144Z" fill="url(#paint98_linear_8712_31655)" />
          <path d="M300.939 143.999H288.939V156H300.939V143.999Z" fill="url(#paint99_linear_8712_31655)" />
          <path d="M48.9379 156H36.9374L36.9378 168H48.9379V156Z" fill="url(#paint100_linear_8712_31655)" />
          <path d="M60.9384 156L48.9379 156V168H60.9384V156Z" fill="url(#paint101_linear_8712_31655)" />
          <path d="M96.9399 156H84.9394L84.9398 168H96.9399V156Z" fill="url(#paint102_linear_8712_31655)" />
          <path d="M120.941 156H108.94L108.941 168H120.941V156Z" fill="url(#paint103_linear_8712_31655)" />
          <path d="M132.938 156H120.938V168H132.938V156Z" fill="url(#paint104_linear_8712_31655)" />
          <path d="M156.939 156H144.939V168H156.939V156Z" fill="url(#paint105_linear_8712_31655)" />
          <path d="M204.938 156H192.938V168H204.938V156Z" fill="url(#paint106_linear_8712_31655)" />
          <path d="M240.94 156H228.939L228.94 168H240.94V156Z" fill="url(#paint107_linear_8712_31655)" />
          <path d="M264.941 156H252.94L252.941 168H264.941V156Z" fill="url(#paint108_linear_8712_31655)" />
          <path d="M288.942 156H276.942V168H288.942V156Z" fill="url(#paint109_linear_8712_31655)" />
          <path d="M24.94 168.001H12.94V180.001H24.94V168.001Z" fill="url(#paint110_linear_8712_31655)" />
          <path d="M36.9378 168L24.9373 168.001V180.001H36.9374L36.9378 168Z" fill="url(#paint111_linear_8712_31655)" />
          <path d="M84.9398 168L72.9393 168.001V180.001H84.9394L84.9398 168Z" fill="url(#paint112_linear_8712_31655)" />
          <path d="M108.941 168H96.9399L96.9403 180.001H108.94L108.941 168Z" fill="url(#paint113_linear_8712_31655)" />
          <path d="M120.941 168H108.941L108.94 180.001H120.941V168Z" fill="url(#paint114_linear_8712_31655)" />
          <path d="M144.939 168H132.938L132.939 180.001H144.939L144.939 168Z" fill="url(#paint115_linear_8712_31655)" />
          <path d="M180.94 168.001H168.94V180.001H180.94V168.001Z" fill="url(#paint116_linear_8712_31655)" />
          <path
            d="M216.939 168.001L204.938 168L204.939 180.001H216.939V168.001Z"
            fill="url(#paint117_linear_8712_31655)"
          />
          <path d="M240.94 168H228.94V180.001H240.94V168Z" fill="url(#paint118_linear_8712_31655)" />
          <path d="M252.941 168H240.94V180.001H252.94L252.941 168Z" fill="url(#paint119_linear_8712_31655)" />
          <path d="M264.941 168H252.941L252.94 180.001H264.941V168Z" fill="url(#paint120_linear_8712_31655)" />
          <path d="M288.942 168H276.942V180.001H288.942V168Z" fill="url(#paint121_linear_8712_31655)" />
          <path d="M300.939 168.001H288.939V180.001H300.939V168.001Z" fill="url(#paint122_linear_8712_31655)" />
          <path
            d="M12.94 180.001L0.939453 180.001V192.001H12.9395L12.94 180.001Z"
            fill="url(#paint123_linear_8712_31655)"
          />
          <path
            d="M48.9379 180.001L36.9374 180.001L36.9378 192.001H48.9379V180.001Z"
            fill="url(#paint124_linear_8712_31655)"
          />
          <path
            d="M96.9403 180.001H84.9394L84.9398 192.001H96.9399L96.9403 180.001Z"
            fill="url(#paint125_linear_8712_31655)"
          />
          <path d="M120.941 180.001H108.94L108.941 192.001H120.941V180.001Z" fill="url(#paint126_linear_8712_31655)" />
          <path
            d="M132.939 180.001L120.938 180.001V192.001H132.938L132.939 180.001Z"
            fill="url(#paint127_linear_8712_31655)"
          />
          <path d="M144.939 180.001H132.939L132.938 192.001H144.939V180.001Z" fill="url(#paint128_linear_8712_31655)" />
          <path d="M156.939 180.001L144.939 180.001V192.001H156.939V180.001Z" fill="url(#paint129_linear_8712_31655)" />
          <path d="M180.94 180.001H168.94V192.001H180.94V180.001Z" fill="url(#paint130_linear_8712_31655)" />
          <path
            d="M204.939 180.001L192.938 180.001V192.001H204.938L204.939 180.001Z"
            fill="url(#paint131_linear_8712_31655)"
          />
          <path d="M288.942 180.001H276.942V192.001H288.942V180.001Z" fill="url(#paint132_linear_8712_31655)" />
          <path d="M300.939 180.001H288.939V192.001H300.939V180.001Z" fill="url(#paint133_linear_8712_31655)" />
          <path d="M36.9374 192H24.9373V204H36.9374V192Z" fill="url(#paint134_linear_8712_31655)" />
          <path d="M48.9379 192H36.9374V204H48.9379V192Z" fill="url(#paint135_linear_8712_31655)" />
          <path d="M72.9389 192H60.9388V204H72.9389V192Z" fill="url(#paint136_linear_8712_31655)" />
          <path d="M84.9394 192H72.9389V204H84.9394V192Z" fill="url(#paint137_linear_8712_31655)" />
          <path d="M96.9399 192H84.9394V204H96.9399V192Z" fill="url(#paint138_linear_8712_31655)" />
          <path d="M108.94 192H96.9399V204H108.94V192Z" fill="url(#paint139_linear_8712_31655)" />
          <path d="M120.941 192H108.94V204H120.941V192Z" fill="url(#paint140_linear_8712_31655)" />
          <path d="M144.939 192H132.939V204H144.939V192Z" fill="url(#paint141_linear_8712_31655)" />
          <path d="M168.94 192H156.94V204H168.94V192Z" fill="url(#paint142_linear_8712_31655)" />
          <path d="M204.938 192H192.938V204H204.938V192Z" fill="url(#paint143_linear_8712_31655)" />
          <path d="M216.939 192H204.938V204H216.939V192Z" fill="url(#paint144_linear_8712_31655)" />
          <path d="M228.939 192H216.939V204H228.939V192Z" fill="url(#paint145_linear_8712_31655)" />
          <path d="M240.94 192H228.939V204H240.94V192Z" fill="url(#paint146_linear_8712_31655)" />
          <path d="M252.94 192H240.94V204H252.94V192Z" fill="url(#paint147_linear_8712_31655)" />
          <path d="M288.942 192H276.942V204H288.942V192Z" fill="url(#paint148_linear_8712_31655)" />
          <path d="M108.94 203.999H96.9403V215.999H108.94V203.999Z" fill="url(#paint149_linear_8712_31655)" />
          <path d="M120.941 203.999H108.94V215.999H120.941V203.999Z" fill="url(#paint150_linear_8712_31655)" />
          <path d="M168.94 203.999H156.94V215.999H168.94V203.999Z" fill="url(#paint151_linear_8712_31655)" />
          <path d="M192.941 203.999H180.941V215.999H192.941V203.999Z" fill="url(#paint152_linear_8712_31655)" />
          <path d="M204.938 203.999H192.938V215.999H204.938V203.999Z" fill="url(#paint153_linear_8712_31655)" />
          <path d="M252.94 203.999H240.94V215.999H252.94V203.999Z" fill="url(#paint154_linear_8712_31655)" />
          <path d="M264.941 203.999H252.94V215.999H264.941V203.999Z" fill="url(#paint155_linear_8712_31655)" />
          <path d="M276.941 203.999H264.941V215.999H276.941V203.999Z" fill="url(#paint156_linear_8712_31655)" />
          <path d="M132.938 216H120.938V228H132.938V216Z" fill="url(#paint157_linear_8712_31655)" />
          <path d="M144.939 216H132.938V228H144.939V216Z" fill="url(#paint158_linear_8712_31655)" />
          <path d="M168.94 215.999H156.94V228H168.94V215.999Z" fill="url(#paint159_linear_8712_31655)" />
          <path d="M180.941 215.999H168.94V228H180.94L180.941 215.999Z" fill="url(#paint160_linear_8712_31655)" />
          <path d="M192.941 215.999H180.941L180.94 228H192.941V215.999Z" fill="url(#paint161_linear_8712_31655)" />
          <path d="M204.938 215.999H192.938V228H204.938V215.999Z" fill="url(#paint162_linear_8712_31655)" />
          <path d="M228.939 216H216.939V228H228.939V216Z" fill="url(#paint163_linear_8712_31655)" />
          <path d="M252.94 215.999H240.94V228H252.94V215.999Z" fill="url(#paint164_linear_8712_31655)" />
          <path d="M276.941 215.999H264.941L264.941 228H276.941V215.999Z" fill="url(#paint165_linear_8712_31655)" />
          <path d="M288.942 216L276.941 215.999V228H288.942V216Z" fill="url(#paint166_linear_8712_31655)" />
          <path d="M300.939 216H288.939V228H300.939V216Z" fill="url(#paint167_linear_8712_31655)" />
          <path d="M120.941 228H108.941V240H120.941V228Z" fill="url(#paint168_linear_8712_31655)" />
          <path d="M132.938 228H120.938V240H132.938V228Z" fill="url(#paint169_linear_8712_31655)" />
          <path d="M156.94 228H144.939L144.939 240H156.939L156.94 228Z" fill="url(#paint170_linear_8712_31655)" />
          <path d="M180.94 228H168.94L168.94 240H180.94V228Z" fill="url(#paint171_linear_8712_31655)" />
          <path d="M192.941 228H180.94V240H192.941V228Z" fill="url(#paint172_linear_8712_31655)" />
          <path d="M204.938 228H192.938V240H204.938V228Z" fill="url(#paint173_linear_8712_31655)" />
          <path d="M252.94 228H240.94V240H252.94V228Z" fill="url(#paint174_linear_8712_31655)" />
          <path d="M288.942 228H276.941L276.942 240H288.942V228Z" fill="url(#paint175_linear_8712_31655)" />
          <path d="M300.939 228H288.939V240H300.939V228Z" fill="url(#paint176_linear_8712_31655)" />
          <path d="M120.941 240H108.941V252.001H120.941V240Z" fill="url(#paint177_linear_8712_31655)" />
          <path d="M132.938 240H120.938V252.001H132.938V240Z" fill="url(#paint178_linear_8712_31655)" />
          <path d="M156.939 240H144.939V252.001H156.939V240Z" fill="url(#paint179_linear_8712_31655)" />
          <path d="M168.94 240H156.939V252.001H168.94L168.94 240Z" fill="url(#paint180_linear_8712_31655)" />
          <path d="M180.94 240H168.94L168.94 252.001H180.94V240Z" fill="url(#paint181_linear_8712_31655)" />
          <path d="M204.938 240H192.938V252.001H204.938V240Z" fill="url(#paint182_linear_8712_31655)" />
          <path d="M216.939 240.001L204.938 240V252.001H216.939V240.001Z" fill="url(#paint183_linear_8712_31655)" />
          <path d="M228.939 240.001H216.939V252.001H228.939V240.001Z" fill="url(#paint184_linear_8712_31655)" />
          <path d="M240.94 240L228.939 240.001V252.001H240.94L240.94 240Z" fill="url(#paint185_linear_8712_31655)" />
          <path d="M252.94 240H240.94L240.94 252.001H252.94V240Z" fill="url(#paint186_linear_8712_31655)" />
          <path d="M276.942 240L264.941 240.001V252.001H276.941L276.942 240Z" fill="url(#paint187_linear_8712_31655)" />
          <path d="M300.939 240H288.939V252.001H300.939V240Z" fill="url(#paint188_linear_8712_31655)" />
          <path
            d="M108.941 252.001L96.9403 252.001V264.001H108.94L108.941 252.001Z"
            fill="url(#paint189_linear_8712_31655)"
          />
          <path d="M132.938 252.001H120.938V264.001H132.938V252.001Z" fill="url(#paint190_linear_8712_31655)" />
          <path d="M144.939 252.001H132.938V264.001H144.939L144.939 252.001Z" fill="url(#paint191_linear_8712_31655)" />
          <path d="M156.939 252.001H144.939L144.939 264.001H156.939V252.001Z" fill="url(#paint192_linear_8712_31655)" />
          <path d="M180.94 252.001H168.94L168.94 264.001H180.94V252.001Z" fill="url(#paint193_linear_8712_31655)" />
          <path d="M192.941 252.001L180.94 252.001V264.001H192.941V252.001Z" fill="url(#paint194_linear_8712_31655)" />
          <path d="M204.938 252.001H192.938V264.001H204.938V252.001Z" fill="url(#paint195_linear_8712_31655)" />
          <path d="M216.939 252.001H204.938V264.001H216.939V252.001Z" fill="url(#paint196_linear_8712_31655)" />
          <path d="M240.94 252.001H228.939L228.94 264.001H240.94V252.001Z" fill="url(#paint197_linear_8712_31655)" />
          <path d="M252.94 252.001H240.94V264.001H252.94V252.001Z" fill="url(#paint198_linear_8712_31655)" />
          <path d="M264.941 252.001H252.94V264.001H264.941L264.941 252.001Z" fill="url(#paint199_linear_8712_31655)" />
          <path
            d="M288.942 252.001L276.941 252.001L276.942 264.001H288.942V252.001Z"
            fill="url(#paint200_linear_8712_31655)"
          />
          <path d="M300.939 252.001H288.939V264.001H300.939V252.001Z" fill="url(#paint201_linear_8712_31655)" />
          <path d="M108.94 264.001H96.9403V276.002H108.94V264.001Z" fill="url(#paint202_linear_8712_31655)" />
          <path d="M120.941 264.002L108.94 264.001V276.002H120.941V264.002Z" fill="url(#paint203_linear_8712_31655)" />
          <path d="M144.939 264.001H132.938L132.939 276.002H144.939V264.001Z" fill="url(#paint204_linear_8712_31655)" />
          <path d="M156.939 264.001H144.939V276.002H156.939V264.001Z" fill="url(#paint205_linear_8712_31655)" />
          <path d="M168.94 264.001H156.939V276.002H168.94L168.94 264.001Z" fill="url(#paint206_linear_8712_31655)" />
          <path d="M192.941 264.001H180.94L180.941 276.002H192.941V264.001Z" fill="url(#paint207_linear_8712_31655)" />
          <path d="M216.939 264.001H204.938L204.939 276.002H216.939V264.001Z" fill="url(#paint208_linear_8712_31655)" />
          <path d="M240.94 264.001H228.94V276.002H240.94V264.001Z" fill="url(#paint209_linear_8712_31655)" />
          <path d="M264.941 264.001H252.94L252.941 276.002H264.941V264.001Z" fill="url(#paint210_linear_8712_31655)" />
          <path d="M276.942 264.001H264.941V276.002H276.941L276.942 264.001Z" fill="url(#paint211_linear_8712_31655)" />
          <path d="M288.942 264.001H276.942L276.941 276.002H288.942V264.001Z" fill="url(#paint212_linear_8712_31655)" />
          <path d="M108.94 276.001H96.9403V288.001H108.94V276.001Z" fill="url(#paint213_linear_8712_31655)" />
          <path d="M120.941 276.001H108.94V288.001H120.941V276.001Z" fill="url(#paint214_linear_8712_31655)" />
          <path d="M144.939 276.001H132.939V288.001H144.939V276.001Z" fill="url(#paint215_linear_8712_31655)" />
          <path d="M156.939 276.001H144.939V288.001H156.939V276.001Z" fill="url(#paint216_linear_8712_31655)" />
          <path d="M168.94 276.001H156.939V288.001H168.94V276.001Z" fill="url(#paint217_linear_8712_31655)" />
          <path d="M180.94 276.001H168.94V288.001H180.94V276.001Z" fill="url(#paint218_linear_8712_31655)" />
          <path d="M204.938 276.001H192.938V288.001H204.938V276.001Z" fill="url(#paint219_linear_8712_31655)" />
          <path d="M216.939 276.001H204.938V288.001H216.939V276.001Z" fill="url(#paint220_linear_8712_31655)" />
          <path d="M240.94 276.001H228.94V288.001H240.94V276.001Z" fill="url(#paint221_linear_8712_31655)" />
          <path d="M252.94 276.001H240.94V288.001H252.94V276.001Z" fill="url(#paint222_linear_8712_31655)" />
          <path d="M288.942 276.001H276.942V288.001H288.942V276.001Z" fill="url(#paint223_linear_8712_31655)" />
          <path d="M300.939 276.001H288.939V288.001H300.939V276.001Z" fill="url(#paint224_linear_8712_31655)" />
          <path d="M108.94 288H96.9403V300H108.94V288Z" fill="url(#paint225_linear_8712_31655)" />
          <path d="M156.939 288H144.939V300H156.939V288Z" fill="url(#paint226_linear_8712_31655)" />
          <path d="M168.94 288H156.939V300H168.94V288Z" fill="url(#paint227_linear_8712_31655)" />
          <path d="M204.938 288H192.938V300H204.938V288Z" fill="url(#paint228_linear_8712_31655)" />
          <path d="M264.941 288H252.941V300H264.941V288Z" fill="url(#paint229_linear_8712_31655)" />
          <path d="M276.941 288H264.941V300H276.941V288Z" fill="url(#paint230_linear_8712_31655)" />
          <path d="M288.942 288H276.941V300H288.942V288Z" fill="url(#paint231_linear_8712_31655)" />
          <path d="M300.939 288H288.939V300H300.939V288Z" fill="url(#paint232_linear_8712_31655)" />
          <path
            d="M1.05946 0.000121505V84.0002H85.0598V0.000121505H1.05946ZM73.0598 72.0002H13.0596V12.0001H73.0598V72.0002Z"
            fill="url(#paint233_linear_8712_31655)"
          />
          <path d="M24.9397 24.0002V60.0002H60.9395V24.0002H24.9397Z" fill="url(#paint234_linear_8712_31655)" />
          <path
            d="M217.059 0.000121505V84.0002H301.059V0.000121505H217.059ZM289.059 72.0002H229.059V12.0001H289.059V72.0002Z"
            fill="url(#paint235_linear_8712_31655)"
          />
          <path d="M240.939 24.0002V60.0002H276.939V24.0002H240.939Z" fill="url(#paint236_linear_8712_31655)" />
          <path
            d="M1.05946 216V300H85.0598V216H1.05946ZM73.0598 288H13.0596V228H73.0598V288Z"
            fill="url(#paint237_linear_8712_31655)"
          />
          <path d="M24.9397 240V276H60.9395V240H24.9397Z" fill="url(#paint238_linear_8712_31655)" />
        </g>
        <defs>
          {Array.from({ length: 239 }).map((_, gradientIndex) => (
            <linearGradient
              key={`paint${gradientIndex}_linear_8712_31655`}
              id={`paint${gradientIndex}_linear_8712_31655`}
              gradientUnits="userSpaceOnUse"
              x1="301.059"
              y1="16.8432"
              x2="0.939458"
              y2="283.157"
            >
              <stop offset="0.225962" stop-color="black" stop-opacity="1" />
              <stop offset="0.524038" stop-color="black" stop-opacity="1" />
              <stop offset="0.711538" stop-color="black" stop-opacity="1" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    );
  }
}
