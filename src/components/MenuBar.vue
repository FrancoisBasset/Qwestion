<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<LogoIcon id="logo" />
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>			
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<QuizSelect class="nav-link" />
					</li>
				</ul>
				<div class="d-flex">
					<ProfileZone class="nav-link" style="margin-right: 10px" />
				</div>
			</div>
		</div>
	</nav>
</template>

<style>
div {
	display: flex;
}

#logo {
	margin-left: auto;
    margin-right: auto;
}
</style>

<script setup>
import QuizSelect from './QuizSelect.vue';
import LogoIcon from './LogoIcon.vue';
import ProfileZone from './ProfileZone.vue';
</script>
