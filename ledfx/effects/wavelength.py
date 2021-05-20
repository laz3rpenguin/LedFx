import numpy as np
import voluptuous as vol

from ledfx.effects.audio import AudioReactiveEffect
from ledfx.effects.gradient import GradientEffect


class WavelengthAudioEffect(AudioReactiveEffect, GradientEffect):

    NAME = "Wavelength"
    CATEGORY = "1.0"

    # There is no additional configuration here, but override the blur
    # default to be 3.0 so blurring is enabled.
    CONFIG_SCHEMA = vol.Schema(
        {
            vol.Optional(
                "blur",
                description="Amount to blur the effect",
                default=3.0,
            ): vol.All(vol.Coerce(float), vol.Range(min=0.0, max=10))
        }
    )

    def on_activate(self, pixel_count):
        self.r = np.zeros(pixel_count)

    def audio_data_updated(self, data):
        # Grab the filtered melbank
        self.r = self.melbanks(filtered=True)

    def render(self):
        # Apply the melbank data to the gradient curve and update the pixels
        return self.apply_gradient(self.r)
