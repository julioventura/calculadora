// This file contains functions for trigonometric operations: Hyp, Sin, Cos, and Tan.

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function hypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
}

function sine(angle) {
    return Math.sin(toRadians(angle));
}

function cosine(angle) {
    return Math.cos(toRadians(angle));
}

function tangent(angle) {
    return Math.tan(toRadians(angle));
}

