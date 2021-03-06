<?php
/**
 * @file
 * Front page template for Mark-a-Spot
 */
?>

<div class="navbar-wrapper">
  <div class="navbar navbar-inverse navbar-static-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
		<div id="loading"></div>
        <?php if ($logo): ?>
          <a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
          </a>
        <?php endif; ?>

        <?php if (!empty($site_name)): ?>
          <a class="name navbar-brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"></a>
        <?php endif; ?>


      </div>


      <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
        <div class="collapse navbar-collapse">
          <nav class="nav navbar-nav">
            <?php if (!empty($primary_nav)): ?>
              <?php print render($primary_nav); ?>
            <?php endif; ?>
            <?php if (!empty($secondary_nav)): ?>
              <?php print render($secondary_nav); ?>
            <?php endif; ?>
            <?php if (!empty($page['navigation'])): ?>
              <?php print render($page['navigation']); ?>
            <?php endif; ?>
          </nav>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>


<div id="map" style="display:none"> </div>
<div id="map_wrapper_splash">
<img class="img-responsive container" src="profiles/markaspot/themes/ntxuva/images/main.png" alt="" >
<div class="mapheader masthead">
  <div class="container stage">
    <div>
      <div class="col-md-12">
        <div class="welcome-text well">

        </div>
        <div class="welcome">
          <?php
            $block = module_invoke('markaspot_default_content', 'block_view', 'add_reports');
            print render($block['content']);
          ?>
          <?php
            $block = module_invoke('markaspot_default_content', 'block_view', 'watch_reports');
            print render($block['content']);
          ?>
        </div>
      </div>

    </div>
  </div>
</div>

</div>

<div class="section-container">
  <div class="section-title">como funciona</div>
  <div class="section-row">
    <div class="col-wrapper">
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_one.png"></span>
    		<h2>Detecta</h2>
    		<p>Fica atento à acumulação de lixo no teu bairro</p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_two.png"></span>
    		<h2>Reporta</h2>
    		<p>Comunica problemas com o teu telemóvel ou através da internet</p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_three.png"></span>
    		<h2>Acompanha</h2>
    		<p>Visualiza a resolução de problemas através da internet</p>
    	</div>
    </div>
  </div>
</div>
<div class="clearer"></div>

<div class="section-container">
  <div class="section-title">participa</div>
  <div class="section-row">
    <div class="secondary-panel">
    	
    	<div class="right">
    		<img class="img-responsive second-illustration" src="profiles/markaspot/themes/ntxuva/images/sec.png" alt="" >
    	</div>
    	<div class="left">
    		<p>O ntxuva é uma plataforma para monitoria e avaliação dos serviços de recolha de resíduos sólidos no teu bairro.</p>
    		<p>
    		Actualmente em versão Beta, a plataforma está a funcionar nos bairros Maxaquene A, Polana Caniço B, Magoanine C e Inhagoia B.
    		</p>
    		<p>
    		Se identificares problemas com a recolha de lixo no teu bairro, podes usar o teu computador ou celular para avisar o Conselho Municipal e as Micro-Empresas de recolha de lixo.
    		</p>
    		<p>
    		Começa já a
    		</p>
    		<div class="button-secondary">
    		<?php
            $block = module_invoke('markaspot_default_content', 'block_view', 'add_reports');
            print render($block['content']);
          ?>
    		</div>
    	</div>
    </div>
  </div>
</div>
<div class="clearer"></div>

<div class="section-container">
  <div class="section-title">estatísticas</div>
  <div class="section-row">
    <div class="col-wrapper">
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_four.png"></span>
    		<h2><span class="average-hours">14</span> horas</h2>
    		<p>Tempo médio para a resolução de problemas
 </p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_five.png"></span>
    		<h2 class="frequent-request-label">Contentor cheio</h2>
    		<p>Problema mais reportado pelos utilizadores</p>
    	</div>
    	<div class="custom-col">
    		<span><img src="profiles/markaspot/themes/ntxuva/images/icon_six.png"></span>
    		<h2 class="frequent-location-label">Magoanine C</h2>
    		<p>Bairro mais activo a reportar os problemas</p>
    	</div>
    </div>
  </div>
</div> 

<div class="clearer"></div>


<footer class="footer navbar-inverse">
  <?php print render($page['footer']); ?>
</footer>
