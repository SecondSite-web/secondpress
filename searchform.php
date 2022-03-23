<?php
/**
 * The template for displaying search forms
 *
 * @package secondpress
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
	<label class="sr-only" for="s"><?php esc_html_e( 'Search', 'secondpress' ); ?></label>
	<div class="input-group">
        <span class="input-group-prepend">
			<input class="submit btn btn-primary" id="searchsubmit" name="submit" type="submit"
                   value="<?php esc_attr_e( 'Search', 'secondpress' ); ?>">
		</span>
        <input class="field form-control" id="s" name="s" type="text"
			placeholder="<?php esc_attr_e( 'Search &hellip;', 'secondpress' ); ?>" value="<?php the_search_query(); ?>">

	</div>
</form>
