#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pink = vec3(0.8745, 0.1098, 0.6824);
vec3 purple = vec3(0.4824, 0.298, 0.5882);
vec3 blue = vec3(0.3804, 0.6353, 0.9725);
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);

vec3 cursorFollowBox(vec2 stCoord, vec2 stMouse, float size) {
    if ((stCoord.x < stMouse.x + size &&
    stCoord.x > stMouse.x - size) &&
    (stCoord.y < stMouse.y + size &&
    stCoord.y > stMouse.y - size))
        return purple;
    return white;
}

vec3 cursorFollowCircle(vec2 stCoord, vec2 stMouse, float size) {
    if (length(stCoord-stMouse) < size)
        return cos(u_time/4.)*vec3(0.7608, 0.3412, 0.3412);
    return black;
}

void main() {
    vec3 outColor;
    //0 to 1 coordinates
    //vec2 stCoord = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    //vec2 stMouse = (2.0*u_mouse.xy-u_resolution.xy)/u_resolution.y;


    vec2 stCoord = gl_FragCoord.xy/u_resolution.xy;
    vec2 stMouse = u_mouse.xy/u_resolution.xy;
    vec2 center = stCoord + vec2(.5,.5);

    outColor = vec3(1.-.3*stCoord.y,1.-.9*stCoord.y,1.-.6*stCoord.y);

    if (stCoord.x > .9 ||
        stCoord.x < .1) {
        outColor += cos(u_time/2.)*vec3(0.7608, 0.3412, 0.3412);;
    }

    outColor /= vec3(cursorFollowBox(stCoord, stMouse, .05));
    outColor += vec3(cursorFollowCircle(stCoord, stMouse, .1));

    gl_FragColor = vec4(outColor, 1);
}