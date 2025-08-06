#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;


int smash(in vec2 centerCoord) {
    if (length(centerCoord) > .5 ||
        abs(centerCoord.y+.3) < 0.015 ||
        abs(centerCoord.x+.2) < .1) 
    return 0;
    return 1;   
}

void main () {
    vec2 uv = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    vec2 mouse = (2.0*u_mouse.xy-u_resolution.xy)/u_resolution.y;

    // center
    vec2 center = uv + vec2(.5,.5);
    
    vec3 white = vec3(1,1,1);
    vec3 gray = vec3(0.3216, 0.3333, 0.3882);
    vec3 black = vec3(0.1137, 0.0745, 0.0745);
    
    vec3 col = black-.2*vec3(uv.x, uv.x, uv.x);

    if (smash(uv-mouse) == 1) col = gray;
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}
