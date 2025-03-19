// src/app/components/capsule-preview/capsule-preview.component.ts
import { Component, Input, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-capsule-preview',
  template: '<div #capsuleContainer></div>',
  styles: [`:host { display: block; height: 300px; }`]
})
export class CapsulePreviewComponent implements AfterViewInit {
  @Input() theme: Theme = 'cyberpunk';
  @ViewChild('capsuleContainer') container!: ElementRef;

  ngAfterViewInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300/300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    // Add theme-based customization
    const colors = {
      cyberpunk: { primary: 0xFF00FF, secondary: 0x00FF00 },
      retro: { primary: 0xFFA500, secondary: 0xFFFF00 },
      futuristic: { primary: 0x00FFFF, secondary: 0xFFFFFF }
    };

    const geometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
    const material = new THREE.MeshPhongMaterial({ 
      color: colors[this.theme].primary,
      emissive: colors[this.theme].secondary,
      emissiveIntensity: 0.5
    });
    
    const capsule = new THREE.Mesh(geometry, material);
    scene.add(capsule);
    
    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);
      capsule.rotation.x += 0.01;
      capsule.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    
    animate();
  }
}