---
theme: default
layout: cover
title: Visualiser les JOINS SQL
subtitle: Animation (appear/slide/fade) + Schémas colorés
transition: fade
---

# Visualiser les JOINS SQL
### Animation progressive + schémas colorés (vert = inclus, gris = exclu)

---
transition: slide-left

# Notation

- Table **A** = cercle gauche <span v-click>🟢</span>
- Table **B** = cercle droit <span v-click>🟢</span>
- Zones **vertes** = **incluses** dans le résultat <span v-click>✅</span>
- Zones **grises** = exclues <span v-click>🚫</span>

---
transition: slide-left

# INNER JOIN
## Intersection uniquement (A ∩ B)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <!-- Background -->
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Left circle (A) excluded -->
      <circle cx="120" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Right circle (B) excluded -->
      <circle cx="220" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection highlight -->
      <path d="M120,30
               a80,80 0 1,0 0,160
               a80,80 0 1,0 0,-160
               M220,30
               a80,80 0 1,0 0,160
               a80,80 0 1,0 0,-160" fill="none"/>
      <defs>
        <clipPath id="clipA">
          <circle cx="120" cy="110" r="80"/>
        </clipPath>
        <clipPath id="clipB">
          <circle cx="220" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipA)">
        <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <!-- Borders -->
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Ne conserve que l'<strong>intersection</strong> (valeurs communes)</li>
      <li v-click>Très utilisé pour croiser des données cohérentes</li>
      <li v-click>Ex: clients ✖️ commandes effectives</li>
    </ul>
  </div>
</div>

---
transition: slide-left

# LEFT JOIN
## Tout A + correspondances trouvées dans B

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Left circle (A) included -->
      <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <!-- Right-only area excluded -->
      <circle cx="220" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection overlay (ensure green where overlapping) -->
      <defs>
        <clipPath id="clipA2">
          <circle cx="120" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipA2)">
        <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de A</li>
      <li v-click>Complète avec B quand une correspondance existe</li>
      <li v-click>Sinon, colonnes de B = <code>NULL</code></li>
    </ul>
  </div>
</div>

---
transition: slide-left

# RIGHT JOIN
## Tout B + correspondances depuis A (LEFT JOIN inversé)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Right circle (B) included -->
      <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <!-- Left-only area excluded -->
      <circle cx="120" cy="110" r="80" fill="#cccccc" fill-opacity="0.7"/>
      <!-- Intersection overlay (ensure green where overlapping) -->
      <defs>
        <clipPath id="clipB2">
          <circle cx="220" cy="110" r="80"/>
        </clipPath>
      </defs>
      <g clip-path="url(#clipB2)">
        <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      </g>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de B</li>
      <li v-click>Complète avec A si correspondance</li>
      <li v-click>Peut être remplacé par LEFT JOIN en inversant les tables</li>
    </ul>
  </div>
</div>

---
transition: slide-left

# FULL OUTER JOIN
## Union complète (A ∪ B)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="340" height="220" viewBox="0 0 340 220">
      <rect x="0" y="0" width="340" height="220" fill="#ffffff"/>
      <!-- Both circles included -->
      <circle cx="120" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <circle cx="220" cy="110" r="80" fill="#34d399" fill-opacity="0.9"/>
      <circle cx="120" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <circle cx="220" cy="110" r="80" fill="none" stroke="#666" stroke-width="2"/>
      <text x="105" y="200" font-size="14" fill="#333">A</text>
      <text x="225" y="200" font-size="14" fill="#333">B</text>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Retourne <strong>toutes</strong> les lignes de A et de B</li>
      <li v-click>Les lignes sans correspondance sont remplies avec <code>NULL</code></li>
      <li v-click>⚠️ SQLite ne supporte pas <em>FULL JOIN</em> nativement</li>
    </ul>
  </div>
</div>

---
transition: slide-left

# CROSS JOIN
## Produit cartésien (tout × tout)

<div class="grid grid-cols-2 gap-6 items-center">
  <div>
    <svg width="360" height="220" viewBox="0 0 360 220">
      <rect x="0" y="0" width="360" height="220" fill="#ffffff"/>
      <!-- Grid dots to symbolize combinations -->
      <g fill="#34d399">
        <!-- 6x4 grid -->
        {% for i in range(6) %}{% endfor %}
      </g>
      <!-- We'll draw dots manually for portability -->
      <g fill="#34d399">
        <circle cx="60" cy="60" r="6"/>
        <circle cx="110" cy="60" r="6"/>
        <circle cx="160" cy="60" r="6"/>
        <circle cx="210" cy="60" r="6"/>
        <circle cx="260" cy="60" r="6"/>
        <circle cx="310" cy="60" r="6"/>

        <circle cx="60" cy="110" r="6"/>
        <circle cx="110" cy="110" r="6"/>
        <circle cx="160" cy="110" r="6"/>
        <circle cx="210" cy="110" r="6"/>
        <circle cx="260" cy="110" r="6"/>
        <circle cx="310" cy="110" r="6"/>

        <circle cx="60" cy="160" r="6"/>
        <circle cx="110" cy="160" r="6"/>
        <circle cx="160" cy="160" r="6"/>
        <circle cx="210" cy="160" r="6"/>
        <circle cx="260" cy="160" r="6"/>
        <circle cx="310" cy="160" r="6"/>
      </g>
    </svg>
  </div>
  <div>
    <ul>
      <li v-click>Combine <strong>chaque ligne</strong> de A avec <strong>chaque ligne</strong> de B</li>
      <li v-click>Attention au volume (explosif sur grandes tables)</li>
      <li v-click>Utile pour générer des combinaisons</li>
    </ul>
  </div>
</div>

---
transition: fade

# Récapitulatif

- <span v-click>INNER = intersection (A ∩ B)</span>  
- <span v-click>LEFT = A + intersection</span>  
- <span v-click>RIGHT = B + intersection</span>  
- <span v-click>FULL = A ∪ B</span>  
- <span v-click>CROSS = toutes les combinaisons</span>

---
layout: center
transition: fade

# 🎉 Fin de l’animation JOIN
Prêt pour les sous-requêtes & GROUP BY !
