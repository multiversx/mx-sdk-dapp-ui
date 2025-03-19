import { Component, getAssetPath, h, Host } from '@stencil/core';

@Component({
  tag: 'tailwind-component',
  shadow: true,
  assetsDirs: ['assets'], // Ensure assets folder is included in the build
})
export class TailwindComponent {
  render() {
    return (
      <Host>
        {/* Ensure Tailwind CSS is loaded */}
        <link rel="stylesheet" href={getAssetPath('src/global/output.css')} />

        <div class="bg-indigo-400 p-6 rounded-md flex justify-center">
          <h1 class="text-white font-sans">This is a Stencil component using Tailwind</h1>
        </div>
      </Host>
    );
  }
}
