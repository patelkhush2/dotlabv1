document.addEventListener('DOMContentLoaded', function () {
    const lottieContainers = document.querySelectorAll('.animation');
  
    if (lottieContainers.length) {
      lottieContainers.forEach(container => {
        LottieScrollTrigger({
          trigger: container,
          start: 'top center',
          endTrigger: '.end-lottie',
          end: `bottom center+=${container.offsetHeight}`,
          renderer: 'svg',
          target: container,
          path: './DL-4K.mp4.lottie.json',
          scrub: 0.5,
        });
      });
    }
  });
  
  function LottieScrollTrigger(vars) {
    const playhead = { frame: 0 };
    const target = gsap.utils.toArray(vars.target)[0];
    const speeds = {
      slow: '+=600',
      medium: '+=1000',
      fast: '+=500',
    };
  
    const st = {
      trigger: vars.trigger || '.trigger',
      end: speeds[vars.speed] || '+=1000',
      scrub: vars.scrub || 0.5,
      markers: false,
    };
  
    const ctx = gsap.context && gsap.context();
  
    const animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || 'svg',
      loop: false,
      autoplay: false,
      path: vars.path,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: 'xMidYMid slice',
      },
    });
  
    Object.assign(st, vars);
  
    animation.addEventListener('DOMLoaded', function () {
      const createTween = function () {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: 'none',
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        });
        return () => animation.destroy && animation.destroy();
      };
  
      ctx && ctx.add ? ctx.add(createTween) : createTween();
    });
  
    return animation;
  }

  function pageTransition() {
    var tl = gsap.timeline();
  
    tl.to(".transition", {
      duration: 1,
      scaleY: 1,
      transformOrigin: "bottom",
      ease: "power4.inOut",
    });
  
    tl.to(".transition", {
      duration: 1,
      scaleY: 0,
      transformOrigin: "top",
      ease: "power4.inOut",
      delay: 0.2,
    });
  }
  
  function pageTransition() {
    var tl = gsap.timeline();
  
    tl.to('.transition', {
      duration: 1,
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power4.inOut',
    });
  
    tl.to('.transition', {
      duration: 1,
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'power4.inOut',
      delay: 0.2,
    });
  }
  
  function delay(n) {
    return new Promise(done => setTimeout(done, n));
  }

  barba.init({
  sync: true,
  transitions: [
    {
      name: 'default-transition',
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        ScrollTrigger.getAll().forEach(st => st.kill());

        initLottieAnimations();

        ScrollTrigger.refresh();
      },
      async once(data) {
        initLottieAnimations();
      },
    },
  ],
});
  