# Simulation: Impact of Medium Resonance on Particle Acceleration
# Purpose: Demonstrates how medium fluctuations affect particle velocity, contrasting vacuum assumptions

import numpy as np
import matplotlib.pyplot as plt

# Constants and environment
c = 3e8  # Speed of light in vacuum (m/s)
steps = 1000  # Simulation steps
dt = 1e-9  # Time increment (seconds)

# Medium parameters (simulate fluctuation/resonance)
def medium_resistance_profile(t):
    # A fluctuating medium due to sonic resonance or field distortion
    return 1 + 0.05 * np.sin(2 * np.pi * 1e6 * t) + 0.02 * np.random.randn(len(t))

# Particle acceleration simulation (modified model)
def simulate_particle_motion(medium_profile):
    velocity = np.zeros_like(medium_profile)
    position = np.zeros_like(medium_profile)
    v = 0
    for i in range(1, len(medium_profile)):
        resistance = medium_profile[i]
        acceleration = (c * 0.01) / resistance  # Arbitrary force input, inversely scaled
        v += acceleration * dt
        v = min(v, c * 0.999)  # Cap just below light speed
        velocity[i] = v
        position[i] = position[i-1] + v * dt
    return velocity, position

# Time axis
time = np.linspace(0, steps * dt, steps)
medium_profile = medium_resistance_profile(time)
velocity, position = simulate_particle_motion(medium_profile)

# Ideal (vacuum-based) model for comparison
ideal_velocity = np.ones(steps) * c * 0.999
ideal_position = np.cumsum(ideal_velocity) * dt

# Plotting the comparison
plt.figure(figsize=(12, 6))
plt.subplot(2, 1, 1)
plt.plot(time, velocity, label='Medium-Aware Velocity')
plt.plot(time, ideal_velocity, '--', label='Vacuum Velocity Model')
plt.ylabel('Velocity (m/s)')
plt.title('Velocity Over Time')
plt.legend()

plt.subplot(2, 1, 2)
plt.plot(time, position, label='Medium-Aware Position')
plt.plot(time, ideal_position, '--', label='Vacuum-Based Position')
plt.ylabel('Position (m)')
plt.xlabel('Time (s)')
plt.title('Position Over Time')
plt.legend()

plt.tight_layout()
plt.show()

