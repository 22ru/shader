#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pink = vec3(0.8745, 0.1098, 0.6824);
vec3 purple = vec3(0.4824, 0.298, 0.5882);
vec3 blue = vec3(0.3804, 0.6353, 0.9725);

void main() {

    //0 to 1 coordinates
    vec2 stCoord = gl_FragCoord.xy/u_resolution;
    vec2 stMouse = u_mouse/u_resolution;

    //box
    if ((gl_FragCoord.x < u_mouse.x + 5. &&
    gl_FragCoord.x > u_mouse.x - 5.) &&
    (gl_FragCoord.y < u_mouse.y + 5. &&
    gl_FragCoord.y > u_mouse.y - 5.)
    ) {
        gl_FragColor = vec4(purple,1.);
        return;
    }

    //circle
    if (length(stCoord-stMouse) < .02) {
        gl_FragColor = vec4(blue, 1.0);
        return;
    }
    

    if (stCoord.x < .1 ||
       	stCoord.x > .9 ) {
        gl_FragColor = vec4(pink, 1.0);
        return;
    }
    gl_FragColor = vec4(1./(stCoord.x*.1),1./stCoord.y*.1,1./stCoord.y*.3,1);

}