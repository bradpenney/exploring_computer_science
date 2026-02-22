# Computer Graphics

Everything you see on a computer screen—from the text in this article to the photorealistic worlds of a modern video game—is the result of **Computer Graphics**. It is the subfield of computer science that deals with generating and manipulating images using computers.

## 1. Raster vs. Vector: The Two Ways to Draw

There are two fundamental ways to represent an image digitally:

### Raster Graphics (The Grid)
A raster image is a grid of colored dots called **Pixels**.
-   **Example:** Photos (JPEG, PNG).
-   **Pros:** Can represent complex textures and subtle color changes perfectly.
-   **Cons:** "Pixelation." If you zoom in too far, the image becomes blocky because you are just looking at larger squares.

### Vector Graphics (The Math)
A vector image is a set of mathematical instructions: *"Draw a circle at (x,y) with radius R and color Blue."*
-   **Example:** Logos, Fonts (SVG, AI).
-   **Pros:** Infinite scaling. You can blow up a vector logo to the size of a billboard and it will stay perfectly crisp.
-   **Cons:** Not suitable for complex, noisy images like a photograph of a forest.

## 2. The Rendering Pipeline

How does a 3D world (like in *Minecraft* or *Call of Duty*) get turned into a 2D image on your flat monitor? This process is called the **Rendering Pipeline**.

1.  **Modeling:** Creating the 3D shapes (Vertices and Polygons).
2.  **Transformation:** Rotating and moving the objects in the 3D world.
3.  **Lighting:** Calculating how light hits the surfaces.
4.  **Projection:** Flattening the 3D scene into a 2D view (like a camera lens).
5.  **Rasterization:** Converting the 2D shapes into pixels on the screen.

## 3. The GPU: The Specialized Engine

Processing millions of pixels 60 times per second is too much work for a general-purpose CPU. For this, we use a **Graphics Processing Unit (GPU)**.

While a CPU is like a high-speed sports car (doing one complex thing at a time), a GPU is like a massive fleet of 1,000 slow trucks. Each "truck" (core) handles a single pixel. Because graphics tasks are **parallel** (calculating Pixel A doesn't depend on Pixel B), the GPU's massive core count makes it incredibly fast at drawing.

## Practice Problems

??? question "Practice Problem 1: Scale Test"

    You are designing a new font. Should you save your letter designs as Raster or Vector files?

    ??? tip "Solution"
        **Vector.** 
        
        Fonts need to look crisp whether they are size 8 on a phone or size 72 on a poster. Vector graphics allow the letter to be recalculated at any size without losing quality.

??? question "Practice Problem 2: The GPU Choice"

    Why are GPUs used for AI training and Crypto mining, even though those aren't "graphics" tasks?

    ??? tip "Solution"
        **Parallelism.** 
        
        Both AI training (Neural Networks) and Crypto mining involve performing the same simple math calculation millions of times simultaneously. Since GPUs are designed for this "Massively Parallel" workload, they are much faster than CPUs for these specific tasks.

## Key Takeaways

| Concept | Meaning |
| :--- | :--- |
| **Pixel** | A single "Picture Element" (dot) on a screen. |
| **Raster** | An image made of pixels (fixed resolution). |
| **Vector** | An image made of math (infinite resolution). |
| **Rendering** | The process of generating an image from a model. |
| **GPU** | Hardware optimized for parallel graphics processing. |

---

Computer graphics is where math meets art. By translating the abstract coordinate systems of geometry into the vibrant colors of the screen, we create the window through which we interact with the digital universe.
